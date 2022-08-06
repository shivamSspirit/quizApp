import { initializeApp } from "firebase/app"
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where, addDoc
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtQxp42NVv8cFajD4qjPpXf01mH_yWo8o",
  authDomain: "quizapp-fb01c.firebaseapp.com",
  projectId: "quizapp-fb01c",
  storageBucket: "quizapp-fb01c.appspot.com",
  messagingSenderId: "965617302900",
  appId: "1:965617302900:web:d9e97ee20ee66196600021",
  measurementId: "G-DLK406WDXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();

export const useAuths=()=>{
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err:any) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const logInWithEmailAndPassword = async (email:any, password:any) => {
      try {
      const res=   await signInWithEmailAndPassword(auth, email, password);
      console.log('res from login',res)
      return res
      } catch (err:any) {
        console.error(err);
        alert(err.message);
      }
    };
  
  
  const registerWithEmailAndPassword = async (displayName:any, email:any, password:any) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log('res from reginsrering user',res)
        const user = res.user;
        navigate('/auth/login')
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name:displayName,
          authProvider: "local",
          email,
        });
      
        // return res.user;
      } catch (err:any) {
        console.error(err);
        alert(err.message);
      }
    };
  
    const sendPasswordReset = async (email:any) => {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
      } catch (err:any) {
        console.error(err);
        alert(err.message);
      }
    };
  
    const logout = () => {
      signOut(auth);
    };

    return {
      auth,
      db,
      signInWithGoogle,
      logInWithEmailAndPassword,
      registerWithEmailAndPassword,
      sendPasswordReset,
      logout,
    }
}




  


