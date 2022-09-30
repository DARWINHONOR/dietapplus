import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import Profile from './src/screens/Profile';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  HStack
} from "@react-native-material/core";
//import auth from '@react-native-firebase/auth';
import Login from './src/screens/Login'
//import LoginContext from './src/screens/Login'

const App = () => {
  //const user = useContext(LoginContext);
  const Tab = createMaterialTopTabNavigator();
  
  return (
    <Login />
    /*<NavigationContainer>
      <AppBar title="Dietapp" />
      <Tab.Navigator>
        <Tab.Screen name="Daily Weight" component={Register} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>*/
  ); 
};

export default App;
