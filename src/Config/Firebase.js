import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, get, getDatabase, ref } from 'firebase/database';

export const FireContext = createContext()

const Firebase = (props) => {
  const [isapion, setIsapion] = useState(false)
  const [user, setUser] = useState(null)
  const [isready, setisready] = useState(false)
  const [userdetails, setuserdetails] = useState({})

  const getuserdetail = (uid) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `patients/${uid}/userdetails`)).then((snapshot) => {
      if (snapshot.exists()) {
        let data=snapshot.val()
        data["uid"]=uid
        setuserdetails(data);
      } else {
        setuserdetails({});
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    let app = null
    const firebaseConfig = {
      apiKey: "AIzaSyBgaiX0lXGlB0UWfTmESvb3Gykywy8yp1k",
      authDomain: "service-learning-3bb28.firebaseapp.com",
      databaseURL: "https://service-learning-3bb28-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "service-learning-3bb28",
      storageBucket: "service-learning-3bb28.appspot.com",
      messagingSenderId: "810147190526",
      appId: "1:810147190526:web:06ecf3e3d35f4910e077af"
    };
    if (app == null) {
      app = initializeApp(firebaseConfig);
      setIsapion(true)
    }
    const analytics = getAnalytics(app);
  }, []);

  useEffect(() => {
    if (!isapion) return

    onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      setUser(user)
      setisready(true)
      if (user) {
        getuserdetail(user.uid)
      }
    })
  }, [isapion])

  if (!isapion || !isready) {
    return <div className='loadingPage'>
      <div className='center'>
        <img src="rpms.png" className='logoloader' />
        <p className='rpmsHeading'>RPMS</p>
      </div>
    </div>
  }
  return (
    <FireContext.Provider value={{ user, userdetails }}>
      {props.children}
    </FireContext.Provider>
  )
}

export default Firebase