import React, {createContext, useEffect, useState} from 'react';
import { View, Image, StyleSheet, ImageBackground} from 'react-native';
import { TextInput, Stack, Button } from "@react-native-material/core";
import Logo from '../../assets/images/LogoDietapplus.png';

import auth from '@react-native-firebase/auth';

import Profile from './Profile';
import Register from './Register';
import RegisterCreate from './RegisterCreate';
import Exit from './Close';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
    HStack,
    Text
  } from "@react-native-material/core";
  import Icon from 'react-native-vector-icons/FontAwesome';

  import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
  import Imagen from '../../assets/images/fondo5.png'

  import { createStackNavigator } from '@react-navigation/stack';

  

//export const LoginContext = createContext();

const SignInScreen: () => Node = () => {
    
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Tab = createMaterialTopTabNavigator();
    const [revealed, setRevealed] = useState(false);

    

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

      const StackN = createStackNavigator();
      function RegisterScreen() {
        return (
          <StackN.Navigator>
            <StackN.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <StackN.Screen name="Create Register" component={RegisterCreate} options={{ headerShown: false }} />
          </StackN.Navigator>
        );
      }

      
      return (
        <ImageBackground source={Imagen} resizeMode='cover' style={{ width:'100%', height: '100%' }} >
        <Backdrop
        style={{ backgroundColor: 'transparent' }}
        revealed={revealed}
        header={
            <AppBar
            title="Dietapp"
            transparent
            leading={props => (
                <IconButton
                icon={props => (
                    <Icon name={revealed ? "close" : "eye"} {...props} />
                )}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
                />
            )}
            />
        }
        backLayer={
            <View style={{ height: 120, alignItems:'center' }} ><Text style={{ color:"#fff", fontSize:20}}>Confía en tí !!</Text></View>
         }
        >
            <BackdropSubheader title={"Wellcome : " + user.email} >
            </BackdropSubheader>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Register">
                    <Drawer.Screen name="Daily Weigth" component={RegisterScreen} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="Exit" component={Exit} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Backdrop>
        </ImageBackground>
        /*<NavigationContainer>
            <AppBar title="Dietapp" />
            <Tab.Navigator>
                <Tab.Screen name="Daily Weight" component={Register} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>*/
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



const Drawer = createDrawerNavigator();

export default SignInScreen;