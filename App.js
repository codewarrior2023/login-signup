import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect, createContext, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthenticatedUserContext.Provider value={{user, setUser, isLoading, setIsLoading}}> 
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

function UnAuthStack() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: () => null,
        contentStyle: {backgroundColor: 'white'},
      }}
    >
      <Stack.Screen 
        name="LogIn" 
        component={LogInScreen}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
      />
    </Stack.Navigator> 
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: () => null,
        contentStyle: {backgroundColor: 'white'},
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
      />
    </Stack.Navigator> 
  );
}

function RootNavigator() {
  const {user, setUser, isLoading, setIsLoading} = useContext(AuthenticatedUserContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (!currentUser) {
        setUser(null);
        setIsLoading(false);
        return;
      } else {
        setUser(currentUser);
        setIsLoading(false);
      }
    })
    return () => unsubscribe();
  }, []);

    if (isLoading) {
        return (
          <View style={styles.container}>
            <Text> Loading... </Text> 
          </View>
        )
    } else {
      return (
        <NavigationContainer>
          {user ? <AuthStack/> : <UnAuthStack/> }
        </NavigationContainer>
      );
    }
  }

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
