// Import the functions you need from the SDKs you need
 
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, FacebookAuthProvider, signOut } from "firebase/auth";
import { getFirestore, addDoc, doc, collection, setDoc, query, where, getDoc, getDocs } from "firebase/firestore";
import { reload } from "../pages/Dashboard";
import { Navigate } from "react-router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmH0jLElfZfmquzDwzdv6u3DwKbBxPf0M",
  authDomain: "ca-project-2023-268f1.firebaseapp.com",
  databaseURL: "https://ca-project-2023-268f1-default-rtdb.firebaseio.com",
  projectId: "ca-project-2023-268f1",
  storageBucket: "ca-project-2023-268f1.appspot.com",
  messagingSenderId: "174144672723",
  appId: "1:174144672723:web:124d6d9a6000b0b4985526",
  measurementId: "G-BZTYM4KKYT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// add facebook provider
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
const profileRef = collection(db, "NewUser24");

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(name, email, profilePic, result)
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};


export const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
      console.log(error);
    });
};

onAuthStateChanged(auth, user => {
  if (user) {

  }
  else {

  }
})

const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};
const getProfile = async (id) => {
  const docRef = doc(db, "NewUser24", id);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error) {
    console.log(error)
  }
}

async function setProfile(data, id, RBY) {
  await setDoc(doc(db, "NewUser24", id), data, { merge: true });
  // const docRef = doc(db, "People", id);

  const q = query(collection(db, "NewUser24"), where("referral_id", "==", RBY));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (dox) => {
    // console.log(doc.id, " => ", doc.data());
    console.log("found");
    const snap = await getDoc(doc(db, "NewUser24/", dox.id, "/points/points"));
    const t = snap.data()["total"]
    console.log(t);
    await setDoc(doc(db, "NewUser24", dox.id), { referred: true }, { merge: true });
    await setDoc(doc(db, "NewUser24", dox.id, "points", "points"), { total: t + 40 }, { merge: true });
  });
}

const uploadImage = async (image, id, user, t) => {
  const data = new FormData()
  const y = doc(db, "UserScores24", id)
  const userRef = await getDoc(y)
  console.log(userRef.data());

  // Submissions
  const s = collection(db, "Submissions24");

  let task = await getDoc(doc(db, "Tasks24", t));
  console.log(task.data())
  let usersComp = task.data().usersComp;


  data.append("file", image)
  data.append("upload_preset", "geeky_images")
  data.append("cloud_name", "dsr4m1th2")
  await fetch("https://api.cloudinary.com/v1_1/dsr4m1th2/image/upload", {
    method: "post",
    body: data
  })
    .then(resp => resp.json())
    .then(data => {
      let push = {};
      let time = new Date();
      push["lastSubmission"] = time
      push["tasks"] = {};
      push["tasks"][t] = {};
      push["tasks"][t]["approved"] = 1;

      let update = {};
      update["usersComp"] = usersComp + 1;


      setDoc(doc(db, "UserScores24", id), push, { merge: true });
      setDoc(doc(db, "Tasks24", t), update, { merge: true });

      // Tasks
      // Submissions
      let submissions = {
        ApprovalStage: 1,
        ImgLink: data.url,
        Task: t,
        User: id,
        time: time,
        points: task.data().taskPoints

      }
      console.log(submissions);
      addDoc(s, submissions);
      return data.url;
    })
    .catch(err => console.log(err))
}
const upload = async (image, id) => {
  const data = new FormData()

  const user = await getDoc(doc(db, "NewUser24", id));
  console.log(user.data());
  let url = user.data().url;

  data.append("file", image)
  data.append("upload_preset", "geeky_images")
  data.append("cloud_name", "dsr4m1th2")
  await fetch("https://api.cloudinary.com/v1_1/dsr4m1th2/image/upload", {
    method: "post",
    body: data
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.url)
      let push = {};
      push["url"] = data.url
      setDoc(doc(db, "NewUser24", id), push, { merge: true });
      return data.url;
    })
    .catch(err => console.log(err))
}



export {
  logout,
  setProfile,
  uploadImage,
  upload,
  getProfile
};




