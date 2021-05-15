import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router'
import firebase from "firebase/compat/app"

const firebaseConfig = {
    apiKey: "AIzaSyBEsFtKNy-h0GFl6oKCIMM5muFPKVKU-n8",
    authDomain: "ecommerce-ec930.firebaseapp.com",
    projectId: "ecommerce-ec930",
    storageBucket: "ecommerce-ec930.appspot.com",
    messagingSenderId: "1079215056515",
    appId: "1:1079215056515:web:b2c16206ca6b6fb44d1db6",
    measurementId: "G-CQK09JZH11"
};
firebase.initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')
