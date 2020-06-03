import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBKXEsHX3KMf69byItnzSQg5q6IH9ej3fc",
    authDomain: "foodx-b86af.firebaseapp.com",
    databaseURL: "https://foodx-b86af.firebaseio.com",
    projectId: "foodx-b86af",
    storageBucket: "foodx-b86af.appspot.com",
    messagingSenderId: "367866314993",
    appId: "1:367866314993:web:e94be73be679dac4782950",
    measurementId: "G-91PRKVZNMS"
  };
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export default firebase;