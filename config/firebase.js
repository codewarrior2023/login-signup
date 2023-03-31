import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app';




const firebaseConfig = {
  apiKey: "AIzaSyBtHYrv2nCwX8-oCKA07fvOYVQO0U5M5Gw",
  authDomain: "project-x-c8324.firebaseapp.com",
  projectId: "project-x-c8324",
  storageBucket: "project-x-c8324.appspot.com",
  messagingSenderId: "348881765945",
  appId: "1:348881765945:web:1f9ebffc2891baafb8efe8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
