import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation";

import Dolphin from "./Object/Dolphin";
import Cat from "./Object/Cat";
import Giraffe from "./Object/Giraffe";
import Dog from "./Object/Dog";
import Horse from "./Object/Horse";
import Tiger from "./Object/Tiger";

import Upload from './Upload'

const RootStack = createStackNavigator({
  Initialize: {
    screen: Upload,
  },
  Cat: {
    screen: Cat,
  },
  Dog: {
    screen: Dog,
  },
  Giraffe: {
    screen: Giraffe,
  },
  Dolphin: {
    screen: Dolphin,
  },
  Horse: {
    screen: Horse,
  },
  Tiger: {
    screen: Tiger,
  },
  
});

export default class Main extends React.Component {
  render() {
    return <RootStack />;
  }
}
