import React, {Component} from 'react';

import Home from './source/Screens/Home';
import List from './source/Screens/List';
import Suggestions from './source/Screens/Suggestions';
import Registration from './source/Screens/Registration';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sugestões" component={Suggestions} />
          <Stack.Screen name="Registro" component={Registration} />
          <Stack.Screen name="Lista" component={List} />
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
