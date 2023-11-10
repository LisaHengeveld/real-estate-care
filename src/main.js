import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG_mlRvdwHajZZKw8flbm56qWzEa3xyNw",
  authDomain: "real-estate-care-fbceb.firebaseapp.com",
  databaseURL: "https://real-estate-care-fbceb-default-rtdb.firebaseio.com/", // Database url (added)
  projectId: "real-estate-care-fbceb",
  storageBucket: "real-estate-care-fbceb.appspot.com",
  messagingSenderId: "90359997112",
  appId: "1:90359997112:web:d22f0ba34f9d6c938d0a4d"
}; 

// Initialize Firebase
initializeApp(firebaseConfig);

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
