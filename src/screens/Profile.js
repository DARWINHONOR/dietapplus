import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Image} from 'react-native';

import { Button, Text, Divider, AppBar } from "@react-native-material/core";

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
          <Image style={styles.logo} source={{uri: item.photo}}  />
        </View>
        
        <View style={styles.container} >
          <Text  variant='h4'>{item.name}</Text>
        </View>  
        <View style={styles.container}>
          <Text style={styles.label}>Fecha de Nacimiento: </Text><Text> 02/01/1986{/*item.date_of_birth.toString()*/}</Text>
        </View>   
        <View style={styles.container}>
          <Text style={styles.label}>Peso Inicial: </Text><Text> {item.initial_weight} Kg</Text>
        </View>
        <View style={styles.container}>  
          <Text style={styles.label}>Altura Inicial: </Text><Text>{item.height} mts</Text>
        </View>
        <View style={styles.container}>  
          <Text style={styles.label}>IMC: </Text><Text>{Math.round(item.initial_weight / (item.height * item.height)).toFixed(2)} </Text>
        </View>
        <View style={{ backgroundColor:'#F44336', padding:15}} >
          <Text variant='subtitle1' style={{ textAlign:'justify', marginBottom:10, color:'#FFCDD2' }}>
            Tomando en cuenta su peso y estatura, se calculó el indice de masa corporal IMC, cuyo resultado apunta a que usted se encuentra con 
          </Text>
          <Text variant='h6' style={{ textAlign:'center',color:'#FFCDD2' }}>Sobrepeso</Text>
        </View>

      </View>
    )
  }
  
  const logoff = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
  return (
    <View>
    <Button onPress={logoff} title="Salir"></Button>
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
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#fff",
    borderColor: '#ccc',
    borderWidth: 1
  },
  containerLogo:{
    alignItems: 'center',
    marginTop: 10,
    elevation: 20
  }
});

export default App;
