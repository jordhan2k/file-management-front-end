// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCktzs29nMmmLS4vsXSm3FN1l7vXcYnaiE",
  authDomain: "file-storage-38b52.firebaseapp.com",
  projectId: "file-storage-38b52",
  storageBucket: "file-storage-38b52.appspot.com",
  messagingSenderId: "897464786760",
  appId: "1:897464786760:web:5638e8d6e4dabb600ddd7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};