import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Image} from 'react-native';

import { Button, Text, Divider, AppBar, ListItem } from "@react-native-material/core";

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const App = () => {
//{ navigation }

  const [user, setUser] = useState([]);

  /**LLAMADA A LA BD */
  useEffect(() => {
  getUserInfo()
  }, []);

  const getUserInfo = () => {
    firestore()
    .collection('profile')
    .get()
    .then(async (users_info) => {
      let tmpUser = [];
      let promiseImages = [];
      users_info.forEach(user_info => {
        //console.log(user_info.data());
        tmpUser.push( user_info.data() );
        promiseImages.push(storage().ref(user_info.data().photo).getDownloadURL());
      })
      
      const resultPromises = await Promise.all(promiseImages);
      resultPromises.forEach((url, index) => {
        tmpUser[index].photo = url;
      });
      setUser(tmpUser);
    })
  }

  const ItemUser = ( {item} ) => {
    return (
      <View style={styles.fondo}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={{uri: item.photo}}  resizeMode="cover" />
        </View>
        <View style={{alignItems: 'center', backgroundColor: '#fff', paddingTop:10}} >
            <Text  style={{ fontWeight:'bold', fontSize: 25 }} >{item.name}</Text>
        </View>  
        <ListItem
            title="Fecha de Nacimiento"
            secondaryText={ "12/05/1988" }
        />
        <ListItem 
            title="Peso Inicial"
            secondaryText={ item.initial_weight }
        />
        <ListItem 
            title="Altura"
            secondaryText={ item.height }
        />
        <ListItem 
            title="Indice de Masa Corporal IMC"
            secondaryText={Math.round(item.initial_weight / (item.height * item.height)).toFixed(2)}
        />
        <ListItem 
            title="Diagnostico"
            secondaryText={ "Tomando en cuenta su peso y estatura, se calcul?? el indice de masa corporal IMC, cuyo resultado apunta a que usted se encuentra con Sobrepeso" }
        />
        

      </View>
    )
  }
  
  return (
    <View>
    
      <FlatList 
        data={user}
        renderItem={ItemUser}
      />
    </View>
  )    
};

const styles = StyleSheet.create({
  label:{
    fontWeight: 'bold',
    fontSize: 15
  },
  container:{
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  logo: {
    width: 400,
    height: 250,
    /*borderRadius: 125,
    backgroundColor: "#fff",
    borderColor: '#ccc',
    borderWidth: 1*/
  },
  containerLogo:{
    alignItems: 'center',
    //marginTop: 10,
    elevation: 20
  }
});

export default App;
