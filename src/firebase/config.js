// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAbhjT6DDrtEA1DSI46JMWpE7tyFbmNK3I",
	authDomain: "todo-list-b4e65.firebaseapp.com",
	databaseURL: "https://todo-list-b4e65-default-rtdb.firebaseio.com/",
	projectId: "todo-list-b4e65",
	storageBucket: "todo-list-b4e65.appspot.com",
	messagingSenderId: "915103657490",
	appId: "1:915103657490:web:85f70d8354eab3ec3a72cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
