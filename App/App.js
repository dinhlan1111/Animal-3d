import React from "react";
import codePush from 'react-native-code-push';
import Main from "./src/Main"

const codePushOptions = { checkFrequency: codePush.CheckFrequency.IMMEDIATE };

function App() {
  return(
    <Main />
  )
}

export default codePush(codePushOptions)(App);
// export default App;
