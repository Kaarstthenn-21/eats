import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBcmW-ftivHfzxfcZ_f12F1F4ln4w0ikTQ",
    authDomain: "sr-eats-7721c.firebaseapp.com",
    projectId: "sr-eats-7721c",
    storageBucket: "sr-eats-7721c.appspot.com",
    messagingSenderId: "51615511795",
    appId: "1:51615511795:web:592e146dbdd22293297386"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = app.auth()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, db, timestamp }