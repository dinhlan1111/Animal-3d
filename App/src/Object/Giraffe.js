import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ModelView } from 'react-native-3d-model-view'

export default class Giraffe extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    message: ''
  }

  modelView = null
  render () {
    return <View style={styles.container}>
      <View style={styles.modelContainer}>
        <ModelView
          ref={modelView => { this.modelView = modelView }}
          style={styles.modelView}
          source={{
            // model: require('./obj/Turtle.obj'),
            // texture: require('./obj/Turtle.jpg')
            model: 'https://github.com/dinhlan1111/models/blob/master/Giraffe.obj?raw=true',
            texture: 'https://github.com/dinhlan1111/models/blob/master/Giraffe.jpg?raw=true',
          }}
          />
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelContainer: {
    // padding: 10,
    width: '100%',
    height: '100%'
  },
  modelView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
})
