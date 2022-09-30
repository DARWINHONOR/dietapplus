import auth from '@react-native-firebase/auth';
const CloseAp = ({ navigation }) => {

    const logoff = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    return (
        logoff()
    );
}
 
export default CloseAp;    