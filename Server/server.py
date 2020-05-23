from flask import Flask, render_template, request, json
import numpy as np
import cv2
import base64
import socket
import time

# Khai bao cong cua server
ip = socket.gethostbyname(socket.gethostname())
my_port = '3000'
scale = 0.00392
conf_threshold = 0.5
nms_threshold = 0.4

# Doan ma khoi tao server
app = Flask(__name__)

# Cac ham ho tro chay YOLO
def get_output_layers(net):
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers


def build_return(class_id):
    return str(class_id)


# Khoi tao model YOLO
net = cv2.dnn.readNet("./yolo/yolov3.weights", "./yolo/yolov3.cfg")
classes = []
with open("./yolo/yolov3.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]


# Khai bao ham xu ly request detect
@app.route('/api/recognize', methods=['POST'])
def detect():

    # Lay du lieu image B64 gui len va chuyen thanh image
    image_b64 = json.loads(request.data)['code']
    print (image_b64)
    image = np.fromstring(base64.b64decode(image_b64), dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_ANYCOLOR)

    #test api
    cv2.imwrite('./img.png',image)

    # Lay kich thuoc anh gui len
    Width = image.shape[1]
    Height = image.shape[0]

    # Nhan dien bang YOLO
    blob = cv2.dnn.blobFromImage(image, scale, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)

    start = time.time()
    outs = net.forward(get_output_layers(net))
    end = time.time()

    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    class_ids = []
    confidences = []
    boxes = []

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > conf_threshold:
                center_x = int(detection[0] * Width)
                center_y = int(detection[1] * Height)
                w = int(detection[2] * Width)
                h = int(detection[3] * Height)
                x = center_x - w / 2
                y = center_y - h / 2
                class_ids.append(class_id)
                confidences.append(float(confidence))
                boxes.append([x, y, w, h])

    indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold, nms_threshold)
    res = ""

    for i in indices:
        i = i[0]
        label = str(classes[class_ids[i]])
        # Xay dung chuoi tra ve client
        res += label + ""
	
    print (res)
    return json.dumps(res)


# Thuc thi server
if __name__ == '__main__':
    app.run(debug=True, host=ip , port=my_port)
