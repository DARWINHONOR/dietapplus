import auth from '@react-native-firebase/auth';
import { Button, TextInput } from '@react-native-material/core';
import { View, StyleSheet } from 'react-native';
const Create = ({ navigation }) => {

    const logoff = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    const onSignInPressed = () => {
        confirm.log("save");
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.item}
            label="Peso del día"
            variant='outlined'
            //onChangeText={text => setEmail(text)}
            />
            <TextInput style={styles.item}
                label="Lo que desayuné"
                variant='outlined'
                //onChangeText={password => setEmail(password)}
            />
            <TextInput style={styles.item}
            label="Comí alguna Merienda?"
            variant='outlined'
            //onChangeText={text => setEmail(text)}
            />
            <TextInput style={styles.item}
                label="Cuál fue mi Almuerzo"
                variant='outlined'
                //onChangeText={password => setEmail(password)}
            />
            <TextInput style={styles.item}
            variant='outlined'
            label="Comí Frutas"
            //onChangeText={text => setEmail(text)}
            />
            <TextInput style={styles.item}
            variant='outlined'
                label="Detalle de mi Cena"
                //onChangeText={password => setEmail(password)}
            />
            <TextInput style={styles.item}
            variant='outlined'
                label="Que actividades físicas realicé?"
                //onChangeText={password => setEmail(password)}
            />
            <Button onPress={onSignInPressed} title="Save" style={styles.button}></Button>
            <Button onPress={() => navigation.goBack()} variant='text' title="Cancelar"></Button>
        </View>
    );
}

const styles =  StyleSheet.create({
    container:{
        padding:15,
        backgroundColor: "#fff",
    },
    logo: {
        width: '60%'
    },
    item:{
        paddingBottom: 10,
        backgroundColor: "#fff"
    },
    button:{
        marginTop: 15,
        padding: 7
    }
});
 
export default Create;  