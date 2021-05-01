import Firebase from "firebase";

let config = {
    apiKey: "AIzaSyDG1frzrbdmGU30CrE4xgQJLJY50QrJGaU",
    authDomain: "ru-hacks-e5a36.firebaseapp.com",
    databaseURL: "https://ru-hacks-e5a36.firebaseio.com",
    projectID: "ru-hacks-e5a36",
    storageBucket: "ru-hacks-e5a36.appspot.com",
    messagingSenderId: "72402589246"
  };
let app =Firebase.initializeApp(config);
export const db = app.database();
