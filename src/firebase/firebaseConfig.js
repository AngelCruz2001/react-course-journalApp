import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB0w5PoDc2WApvNA-41gOoA501sLdwlUjI",
    authDomain: "react-app-cursos-5429b.firebaseapp.com",
    databaseURL: "https://react-app-cursos-5429b.firebaseio.com",
    projectId: "react-app-cursos-5429b",
    storageBucket: "react-app-cursos-5429b.appspot.com",
    messagingSenderId: "592320437016",
    appId: "1:592320437016:web:32a9b462d69e3738c45c6d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}