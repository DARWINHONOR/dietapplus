import { ListItem, Divider } from '@react-native-material/core';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'; 

const ItemRegister = ({item}) => {
    return (
        <View style={styles.card}>
            <View style={{backgroundColor: '#ccc'}} >
                <Image style={styles.image} source={{uri: item.photo}}  />
            </View>  
            <View style={{alignItems: 'center'}} >
                <Text  style={{ fontWeight:'bold', fontSize: 15 }} >{item.fecha}</Text>
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
            <Divider style={{ marginTop: 60 }} leadingInset={16} />
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
      //padding:10
    },
    flatlist:{
      margin:5,
      backgroundColor: "#fff"
    }
  });

export default ItemRegister;