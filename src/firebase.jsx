// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkHxez5JfJCGXgtx20en1AJR6Q-l7orxU",
  authDomain: "blogpostserver.firebaseapp.com",
  projectId: "blogpostserver",
  storageBucket: "blogpostserver.appspot.com",
  messagingSenderId: "789738462608",
  appId: "1:789738462608:web:04c54c5fbb89135858e715",
  measurementId: "G-M69MQMT8XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);

export async function upload(file, Uid, setUrl) {
  const fileRef = ref(storage, Uid + '.png');
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = String(Uid) + '.png';
  console.log(photoURL);
  setUrl(photoURL);
  return photoURL;
}