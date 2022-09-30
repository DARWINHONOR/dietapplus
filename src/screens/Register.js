import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { Fab, Icon, NativeBaseProvider } from 'native-base'

//import { FAB, Stack } from "@react-native-material/core";

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import ItemRegister from '../component/ItemRegister';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = ({navigation}) => {
//{ navigation }
  const [register, setRegister] = useState([]);

  /**LLAMADA A LA BD */
  useEffect(() => {
    getRegister()
  }, []);

  const getRegister = () => {
    firestore()
    .collection('register')
    .get()
    .then(async (registers) => {
      let tmpRegister = [];
      let promiseImages = [];
      let promiseImagesProfile = [];
      registers.forEach(register => {
        //console.log(register.data());
        tmpRegister.push( register.data() );
        promiseImages.push(storage().ref(register.data().photo).getDownloadURL());
        promiseImagesProfile.push(storage().ref(register.data().photo_user).getDownloadURL());
      })

      const resultPromises = await Promise.all(promiseImages);
      const resultPromisesProfile = await Promise.all(promiseImagesProfile);
      resultPromises.forEach((url, index) => {
        tmpRegister[index].photo = url;
      });
      resultPromisesProfile.forEach((url, index) => {
        //console.log("photo_uiser = " + url);
        tmpRegister[index].photo_user = url;
      });
      setRegister(tmpRegister);
    })
  }

  return (
    <NativeBaseProvider>
    <View>

      <Fab
        bg='#448AFF'
        placement='bottom-right'
        icon={
        <Icon
        color="white"
        as={FontAwesome}
        name="plus"
        onPress={ () => navigation.navigate('Create Register')}
        />
        }

        />

      <FlatList style={styles.flatlist}
        data={register}
        renderItem={ ItemRegister }
      />

    </View>
    </NativeBaseProvider>
  )
};

const styles = StyleSheet.create({
  flatlist:{
    margin:15,
    backgroundColor: "transparent",

  }
});

export default App;
