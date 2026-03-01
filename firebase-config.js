// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, get, set, child, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT7uIv5EgMbgkpmj41IiIcNi1nFBy9l1c",
    authDomain: "efootball-student-league.firebaseapp.com",
    databaseURL: "https://efootball-student-league-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "efootball-student-league",
    storageBucket: "efootball-student-league.firebasestorage.app",
    messagingSenderId: "46495203740",
    appId: "1:46495203740:web:99e4d3fc261695d629c859",
    measurementId: "G-T9S53YQWK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Make necessary methods globally accessible for our static HTML files
window.firebaseDB = database;
window.firebaseRef = ref;
window.firebaseGet = get;
window.firebaseSet = set;
window.firebaseChild = child;
window.firebasePush = push;
window.firebaseRemove = remove;
window.firebaseOnValue = onValue;
