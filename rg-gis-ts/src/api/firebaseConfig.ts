import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey:            "AIzaSyDYt8647SlbOs3iCMLlQF4KYuTe-2AqW4w",
  authDomain:        "fitness-744b9.firebaseapp.com",
  databaseURL:       "https://fitness-744b9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "fitness-744b9",
  storageBucket:     "fitness-744b9.appspot.com",
  messagingSenderId: "637483290086",
  appId:             "1:637483290086:web:0a38de7ef488ef45eada27",
}

const app  = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db   = getDatabase(app)

export { app, auth, db }
