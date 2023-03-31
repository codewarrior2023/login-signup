import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform} from "react-native";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useState } from "react";
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function LogInScreen({navigation}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onHandleSignUp = () => {

      if (email !== '' && password !=='') {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Sign Up Successful!");
        })
        .catch((error) => {
          Alert.alert("Sign Up Unsuccessful", error.message);
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
        <View>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>
                Create Your Account
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                />
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
                <TextInput 
                    style={styles.input}
                    placeholder=" Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={onHandleSignUp}
                >
                    <Text style={styles.buttonText}> 
                      Sign Up 
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.LogInContainer}> 
                <Text style={styles.LogInText}> 
                  Don't have an account? 
                </Text>

                <Text 
                  style={styles.LogInLink}
                  onPress={() => navigation.replace("LogIn")}
                > 
                  Log in
                </Text>
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
    createAccountContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    createAccountText: {
      fontSize: 26,
      fontFamily: 'Poppins_600SemiBold',
      fontWeight: '700',
    },
    createAccountSubText: {
      fontSize: 16,
      fontFamily: 'Poppins_300Light',
      textAlign: 'center',
      marginTop: 10,
      marginLeft: 40,
      marginRight: 40,
      
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
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
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
    LogInContainer: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    LogInText: {
        fontSize: 16,
        fontFamily: 'Poppins_300Light',
    },
    LogInLink: {
        color: '#637cdd',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 5,
    },
  });