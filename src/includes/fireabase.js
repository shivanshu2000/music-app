import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrlDxixrigu0Bb3zngSVMYQXKwGIuzJKY',
  authDomain: 'music-app-a44ff.firebaseapp.com',
  projectId: 'music-app-a44ff',
  storageBucket: 'music-app-a44ff.appspot.com',
  appId: '1:758134337146:web:55c63e150d3eb43ee715c3',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export { auth, db, usersCollection };
