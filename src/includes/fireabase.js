import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');
// eslint-disable-next-line object-curly-newline
export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
