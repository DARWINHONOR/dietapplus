import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';

import { Button, Text, Divider,ListItem } from "@react-native-material/core";

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import ItemRegister from '../component/ItemRegister';

const App = () => {
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
      registers.forEach(register => {
        console.log(register.data());
        tmpRegister.push( register.data() );
        promiseImages.push(storage().ref(register.data().photo).getDownloadURL());
      })
      
      const resultPromises = await Promise.all(promiseImages);
      resultPromises.forEach((url, index) => {
        tmpRegister[index].photo = url;
      });
      setRegister(tmpRegister);
    })
  }

  return (
    <FlatList style={styles.flatlist}
      data={register}
      renderItem={ ItemRegister } 
    /> 
  )    
};

const styles = StyleSheet.create({
  flatlist:{
    margin:15,
    backgroundColor: "#fff"
  }
});

export default App;
