/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from '@navigation/index';

const App = () => {
  EStyleSheet.build(theme);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={EStyleSheet.value('$primary')} />
      <Navigator />
    </>
  );
};

const theme = {
  $primary: '#19456B',
  $accent: '#16c79a',
  $text: '#212121',
};

export default App;
