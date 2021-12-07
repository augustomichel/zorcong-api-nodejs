import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCaA0BvV98pkdFYb3t_M5iWbkMpLHn7yPY',
  authDomain: 'zorzanellocon.firebaseapp.com',
  databaseURL: 'https://zorzanellocon-default-rtdb.firebaseio.com',
  projectId: 'zorzanellocon',
  storageBucket: 'zorzanellocon.appspot.com',
  messagingSenderId: '587148308992',
  appId: '1:587148308992:web:4aed768d3f184f16729ee5',
};

const db = initializeApp(firebaseConfig);
const database = getDatabase(db);

export default database;
