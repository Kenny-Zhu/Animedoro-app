import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoQm9K0WTWqIKRvtjEOdmga1oCLV8_tUM",
  authDomain: "animedoro-af1bd.firebaseapp.com",
  projectId: "animedoro-af1bd",
  storageBucket: "animedoro-af1bd.appspot.com",
  messagingSenderId: "997955673918",
  appId: "1:997955673918:web:4d8a219821dbd1c439166f",
  measurementId: "G-FX1PQGFMJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

//init services
export const db = getFirestore()

//collection ref
const colRef = collection(db, 'Anime')

//get collection data
getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    })

const provider = new GoogleAuthProvider()


const uid = '';
export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const pfp = result.user.photoURL;
        const uid = result.user.uid;
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("pfp", pfp)
        localStorage.setItem("uid", uid)
    }).catch((error) => {
        console.log(error);
    });
};

export const signOutWithGoogle = () => {
    signOut(auth).then(() => {
        localStorage.setItem("name", '')
        localStorage.setItem("email", '')
        localStorage.setItem("pfp", '')
        localStorage.setItem("uid", '')
        alert('sign out succesful!')

    }).catch((error) => {
        alert(error);
    });
}