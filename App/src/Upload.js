import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Button, Alert, ActivityIndicator, Platform} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import ImagePicker from 'react-native-image-picker';
// import ip from '../ipConfig';

function SplashScreen(){
  return(
    <View style={styles.loadingStyle}>
          <Image
              style={{position:'absolute', top: 0, bottom: 0, width: "100%", height:"100%"}}
              source={require('../assets/splash.png')}
          />
    </View>
  )
}

export default class Upload extends React.Component {
   
  constructor(props){
    super(props);
    this.state = {
      key: "",
      image: null,
      loading: false,
      startUp: true,
      isDialogVisible: false,
      avatarSource: null,
      ip: "192.168.1.118:3000",
    }
  }
  static navigationOptions = {
    header: null,
  };
  
  componentDidMount() {

    setTimeout(() => {
      this.setState({startUp:false})
    }, 2000);
  }

  _takePhoto = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        
      } else {
        let source = {uri: response.uri};
        this.setState({
          avatarSource: response.data,
          image: source,
        });
      }
    });
  };

  _upLoad = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        
      } else {
        let source = {uri: response.uri};
        this.setState({
          avatarSource: response.data,
          image: source,
        });
      }
    });
  };

  recognition = async () => {
    this.setState({ loading: true })
    this.sendBase64(this.state.avatarSource)
  };

  sendBase64 = (b64, isLandscape) => {
       let data = {
           code: b64,
           isLandscape: isLandscape,
       }
      //  let url = ip;
      let url = `http://${this.state.ip}/api/recognize`;
       let header = {
           'Content-Type': 'application/json',
       }
       console.log(data)
       fetch(url, {
           method: "POST",
           headers: header,
           body: JSON.stringify(data)
       }).then(res =>  { return res.json() })
            .then (res => {
              console.log("Ok", res)
              this.setState({ key: res, loading: false})
              console.log("Ok", this.state.key)
              switch (this.state.key) {
                case 'hello':
                  this.props.navigation.navigate('Cat');
                  break;
                case 'cat':
                  this.props.navigation.navigate('Cat');
                  break;
                case 'dog':
                  this.props.navigation.navigate('Dog');
                  break;
                case 'laptop':
                  this.props.navigation.navigate('Dolphin');
                  break;
                case 'giraffe':
                  this.props.navigation.navigate('Giraffe');
                  break;
                case 'tiger':
                  this.props.navigation.navigate('Tiger');
                  break;
                case 'horse':
                  this.props.navigation.navigate('Horse');
                  break;
                default:
                  Alert.alert(
                    'Note: Detect only single object'
                  )
              }
          })
          .catch(err => {
            this.setState({loading: false})
            Alert.alert(
              "Network Failed"
            )
          })
    }

    showDialog(isShow){
      this.setState({isDialogVisible: isShow});
    }

    sendInput(inputText){
      console.log("Input: " + inputText);
      this.setState({ip: inputText})
    }

  render() {
    const { startUp, loading, ip} = this.state;
    if (startUp === true) {
      return <SplashScreen />;
    }
    return (

        <View style={styles.container}>
          <Image
                style={styles.bg}
                source={require('../assets/bg-upload.jpg')}
              />
              <View style={styles.boder}>
                  <Image
                      source={this.state.image}
                      style={{ width: 244, height: 244, borderRadius: 3 }}
                  />
              </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this._takePhoto()}>
                <Image
                  style={{width: 130, height: 80, borderRadius: 15}}
                  source={require('../assets/camera-icon.png')}
                />
              </TouchableOpacity>
              <View style={{width: '10%'}}></View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this._upLoad()}
                >
                  <Image
                  style={{width: 130, height: 80, borderRadius: 15}}
                  source={require('../assets/image-icon.png')}
                />
              </TouchableOpacity>
            </View>
            
            
            <TouchableOpacity
                style={styles.detect}
                onPress={() => this.recognition()}
                >
                  <Text style={styles.text}>
                      DECTECT
                  </Text>
            </TouchableOpacity>

            <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"CONFIG IP"}
                    message={"Using IP: " + ip}
                    hintInput ={"Ip Address"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
            </DialogInput> 

            <TouchableOpacity
                onPress={()=>{this.showDialog(true)}}
                style={styles.setting}>
                <Image
                style={{ width: 30, height: 30, borderRadius: 3 }}
                source={require('../assets/settings.png')}
              />
            </TouchableOpacity>
            {loading ?
                  <View style={styles.loadingStyle}>
                      <ActivityIndicator style={styles.loadingImage} size="large" color="#56f409" />
                  </View> : null
            }
        </View>
     );
   }
  }


const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  preview: {
       height: winHeight,
       width: winWidth,
       position: 'absolute',
       left: 0,
       top: 0,
       right: 0,
       bottom: 0,
   },
   container: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: 'white',
     alignItems: 'center',
   },
   image: {
     width: 300,
     height: 300,
     backgroundColor: 'gray',
     alignItems: "center"
   },
   text: {
     fontWeight: 'bold',
     fontSize: 17,
     color: 'white',
     textAlign: 'center',
     backgroundColor: '#2E9AFE',
   },
   detect: {
     width: 100,
     height: 100,
     borderRadius: 50,
     backgroundColor: '#2E9AFE',
     justifyContent: 'center',
     alignItems: 'center',
     bottom: 15,
     position: 'absolute'
   },
   row:{
    flexDirection: 'row', 
    position: 'absolute', 
    top: '57%',
    justifyContent: 'center',
    alignItems: 'center', 
   },
   btn: {
     backgroundColor: '#2E9AFE',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 15
   },
   boder: {
     width: 250,
     height: 250,
     position: 'absolute',
     borderWidth: 3,
     borderColor: '#2E9AFE',
     borderRadius: 5,
     top: '8%',
     backgroundColor: 'white'
   },
   bg:{
     position: 'absolute',
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     opacity: 0.6,
     width: winWidth,
     height: winHeight,
   },
   loadingImage: {
       width: 30,
       height: 30,
       marginTop: 10,
       marginBottom: 10,
       width: winWidth,
       height: winHeight,
       backgroundColor: 'black',
       opacity: 0.5,
   },
   loadingStyle: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
    },
    setting: {
      position:'absolute',

      right: 10,
      ...Platform.select({
        ios: {
         top: 25,
        },
        android:{
         top: 10,
       },
      }),
    }

});
