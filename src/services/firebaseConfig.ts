import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHF3Pn_imNrB-MRAO6kQtsSLCB__12k-o",
  authDomain: "cars-projects-317ef.firebaseapp.com",
  projectId: "cars-projects-317ef",
  storageBucket: "cars-projects-317ef.appspot.com",
  messagingSenderId: "612500373363",
  appId: "1:612500373363:web:661b979a1e555b4b854f06"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();
const storage = getStorage()

export { auth, provider, db, storage }