import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDQQC3WZVXgf4oGHAVipgV34uRz8fXVRXg",
  authDomain: "mymoviewatchlist-c8cb8.firebaseapp.com",
  databaseURL: "https://mymoviewatchlist-c8cb8.firebaseio.com",
  projectId: "mymoviewatchlist-c8cb8",
  storageBucket: "mymoviewatchlist-c8cb8.appspot.com",
  messagingSenderId: "805818953011",
  appId: "1:805818953011:web:0753718da82b5e669e2246",
  measurementId: "G-GMSZC8CLCD"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
