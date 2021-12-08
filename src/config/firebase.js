// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,updateEmail,signOut} from "firebase/auth";
import { getFirestore, collection,
  addDoc, setDoc, doc, getDoc, query, getDocs,updateDoc,where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdjpcjPpRmzfi98v8HfLvtBytwpKdQIyw",
  authDomain: "carsist-5c761.firebaseapp.com",
  projectId: "carsist-5c761",
  storageBucket: "carsist-5c761.appspot.com",
  messagingSenderId: "750585716376",
  appId: "1:750585716376:web:f0ea2d49e84641b3e2baed",
  measurementId: "G-F614Z8RNRP"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


async function registerUser(authParams)
{
  const {name,email,contact,password} = authParams;

  
  const {user:{uid}} = await createUserWithEmailAndPassword(auth, email, password)
 
//   const storageRef = ref(storage, 'users/' + picture.name) 
//     await uploadBytes(storageRef, picture)
//     const url = await getDownloadURL(storageRef)
 
 
  await setDoc(doc(db, "users", uid), {
    email,name,contact
  });
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  data.id=uid;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  return data;
  
    
}

function logout() {
  signOut(auth)
}



async function loginUser(email,password)
{

  const {user:{uid}} = await signInWithEmailAndPassword(auth, email, password)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
    data.id=uid;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  return data;
  
  // user = userCredential.user.uid.toString();

}

async function setlocation(id,latitude,longitude)
{
    
    await setDoc(doc(db, "location", id), {
    latitude,longitude
    });
    
    
}

async function updatelocation(id,latitude,longitude)
{
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
        latitude,longitude
      });
   
}

async function getDrivers()
{
  const q = query(collection(db, "Driver"));

const querySnapshot = await getDocs(q);
const driver = [];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  driver.push({ ...doc.data(), id: doc.id});
});
return driver;
}
async function requestRide(params)
{
 const {car,driverId,driverLocation,fare,status,user,userDestination,userPickup
 } = params;
 
 const docRef = await addDoc(collection(db, "Rides"), {
   car,driverId,driverLocation,fare,status,user,userDestination,userPickup
  
  });
  return docRef.id;
 
}

export{
    registerUser,
    loginUser,
    setlocation,
    updatelocation,
    getDrivers,
    requestRide
}

