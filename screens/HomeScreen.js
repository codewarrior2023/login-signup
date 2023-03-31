import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { auth } from '../config/firebase';
import { signOut} from "firebase/auth";


export default function WelcomeScreen() {

    const onHandleLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Log Out Success!");
            })
            .catch(() => {
                console.log("Log Out Error");
            })
    }

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.courseContainer}>
                    <Text> 3D Design Basics </Text>
                    <Text> 24 Lessons </Text> 
                    <Text> 4.9 </Text>
                    <Text> $24.99</Text>
                </View>

                <View style={styles.courseContainer}>

                </View>







                <TouchableOpacity>
                    <Text> Home </Text>
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={onHandleLogOut}
                >
                    <Text> Logout </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseContainer: {
        width: 350,
        height: 95,
        backgroundColor: '#fff',
        borderColor: '#E5E5E5',
        borderWidth: 2, 
        borderRadius: 15,
        marginBottom: 35,
        shadowColor: '#637cdd',
        shadowOffset: {width: 2, height: 8},
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 15,

    }
  });