import { ListItem, Divider, Text } from '@react-native-material/core';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native'; 
import Logo from '../../assets/images/LogoDietapplus.png';

const ItemRegister = ({item}) => {
    return (
        <View style={styles.card}>
            <View style={styles.containerLogo}>
              <Text style={styles.logo}>{item.weight} </Text>
              <Text style={{ color: "#fff", fontSize: 20, marginTop: -50 }}>Kg</Text>
            </View>
            <View style={{backgroundColor: '#ccc', borderTopRightRadius:15, borderTopLeftRadius:15}} >
                <Image style={styles.image} source={{uri: item.photo}}  />
            </View>  
            <View style={{alignItems: 'center', backgroundColor: '#fff'}} >
                <Text  style={{ fontWeight:'bold', fontSize: 20 }} >{item.fecha}</Text>
            </View>  
            <ListItem 
                title="Desayuno"
                secondaryText={ item.desayuno }
            />
            <ListItem 
                title="Merienda"
                secondaryText={ item.merienda }
            />
            <ListItem 
                title="Almuerzo"
                secondaryText={ item.almuerzo }
            />
            <ListItem 
                title="Cena"
                secondaryText={ item.cena }
            />
            <ListItem 
                title="Ejercicio"
                secondaryText={ item.ejercicio }
            />
      </View>
    );
}

const styles = StyleSheet.create({
    label:{
      fontWeight: 'bold',
      fontSize: 25
    },
    container:{
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between'
    },
    image:{
      width: 300,
      height: 150
    },
    card:{
      backgroundColor: 'transparent'
    },
    flatlist:{
      margin:5,
      backgroundColor: "#fff"
    },
    logo: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#fff",
      //borderColor: '#ccc',
      //borderWidth: 1,
      fontSize: 40,
      fontWeight:'bold',
      color: "#fff",
      textAlign:'center',
      backgroundColor:"#FF5722",
      textAlignVertical:'center'
    },
    containerLogo:{
      alignItems: 'center',
      margin: 10,
      marginBottom: -50,
      zIndex: 1,
      elevation: 20,
    }
  });

export default ItemRegister;