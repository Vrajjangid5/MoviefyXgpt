// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmWpUwpVGIEPHv5P56v7PbeUxe-BYodKs",
  authDomain: "moviefy-d5cbc.firebaseapp.com",
  projectId: "moviefy-d5cbc",
  storageBucket: "moviefy-d5cbc.appspot.com",
  messagingSenderId: "391831139461",
  appId: "1:391831139461:web:f0e5e026f85408688125ec",
  measurementId: "G-5QWBH58GZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();