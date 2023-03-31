import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useState } from "react";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogInScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleLogIn = () => {

        if (email !== '' && password !=='') {

        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            console.log("Log In Successful!");
          })
          .catch((error) => {
            Alert.alert("Log In Unsuccessful", error.message);
          })
      } else {
        Alert.alert("Sign Up Unsuccessful", "Please fill out all of the fields before submitting");
      }
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    
    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style={styles.container}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={require('../assets/VecteezyHappy_Woman_Study_ActivityIllustrationAS072021_generated.jpg')}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email Address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
            </View>

            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}> 
                        Forgot your password? 
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onHandleLogIn}
                >
                    <Text style={styles.buttonText}> 
                        Log In 
                    </Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}> 
                    <Text style={styles.signUpText}> 
                        Don't have an account? 
                    </Text>
                    <Text 
                        style={styles.signUpLink}
                        onPress={() => navigation.replace("SignUp")}
                    > 
                        Sign up 
                    </Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    image: {
        width: 350,
        height: 300,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',  
    },
    input: {
        fontSize: 16,
        fontFamily: 'Poppins_300Light',
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: 325,
        height: 54,
        marginTop: 20,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        justifyContent:'flex-end',
        paddingTop: 10,
        paddingRight: 25,
        marginLeft: 165,
    },
    forgotPasswordText: {
        fontSize: 15,
        fontFamily: 'Poppins_300Light',
        color: '#D3D3D3',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    button: {
        backgroundColor: '#637cdd',
        borderRadius: 25,
        width: 325,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '700',
        color: 'white',
    },
    signUpContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 16,
        fontFamily: 'Poppins_300Light',
    },
    signUpLink: {
        color: '#637cdd',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 5,
    },
  });