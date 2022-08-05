import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCikYSbGIXKF2LkwvUrrfmFlMgr5JEHgwU",
  authDomain: "how-much-is-left-93e09.firebaseapp.com",
  projectId: "how-much-is-left-93e09",
  storageBucket: "how-much-is-left-93e09.appspot.com",
  messagingSenderId: "217842911069",
  appId: "1:217842911069:web:f73f569fbbbe1494fecab4",
};

const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
