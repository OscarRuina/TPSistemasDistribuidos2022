// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh9Lq3zuUtpTHc0PX_2D0jgpTjispyTpQ",
  authDomain: "distribuidos-2022.firebaseapp.com",
  projectId: "distribuidos-2022",
  storageBucket: "distribuidos-2022.appspot.com",
  messagingSenderId: "793775044195",
  appId: "1:793775044195:web:1bdbfa33a323e8e6caea56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadImages(file){
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}