import React, {createContext, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { TextInput, Stack, Button } from "@react-native-material/core";
import Logo from '../../assets/images/LogoDietapplus.png';

import auth from '@react-native-firebase/auth';

import Profile from './Profile';
import Register from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
    HStack
  } from "@react-native-material/core";
  import Icon from 'react-native-vector-icons/FontAwesome';

//export const LoginContext = createContext();

const SignInScreen: () => Node = () => {
    
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Tab = createMaterialTopTabNavigator();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    createUser = () =>{
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

    const logoff = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    const onSignInPressed = () => {
        createUser();
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;
    
      if (!user) {
        return (
            <View style={styles.container}>
                <Image source={Logo} style={styles.logo} resizeMode="contain"/>
                <Stack spacing={2} style={{ margin: 20, width:'100%' }}>
                <TextInput style={styles.item}
                    label="Username"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    trailing={props => (
                        /*<IconButton icon={props => <Icon name="eye" {...props} />} {...props} />*/
                        <Icon name="user" size={20} color="#ccc" />
                    )}
                    />
                    <TextInput style={styles.item}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    trailing={props => (
                        <Icon name="eye" size={20} color="#ccc"/>
                    )}
                    />
                    <Button onPress={onSignInPressed} title="Sign In" style={styles.button}></Button>
                    <Button variant='text' title="Forgot passsword?"></Button>
                </Stack>    
            </View>
        );
      }

      
      return (
        <NavigationContainer>
            <AppBar title="Dietapp" />
            <Tab.Navigator>
                <Tab.Screen name="Daily Weight" component={Register} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
      );
    

    /*return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} resizeMode="contain"/>
            <Stack spacing={2} style={{ margin: 20, width:'100%' }}>
            <TextInput style={styles.item}
                label="Username"
                value='email'
                onChangeText={text => setEmail(text)}
                />
                <TextInput style={styles.item}
                    label="Password"
                    secureTextEntry
                    value='password'
                    onChangeText={password => setEmail(password)}
                />
                <Button onPress={onSignInPressed} title="Sign In" style={styles.button}></Button>
                <Button variant='text' title="Forgot passsword?"></Button>
            </Stack>    
        </View>
    );*/
};

const styles =  StyleSheet.create({
    container:{
        alignItems:'center',
        margin: 20
    },
    logo: {
        width: '60%'
    },
    item:{
        paddingBottom: 10
    },
    button:{
        marginTop: 15,
        padding: 7
    }
});

export default SignInScreen;