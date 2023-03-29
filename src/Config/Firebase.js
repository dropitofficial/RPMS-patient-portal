import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from 'firebase/auth';

const FireContext = createContext()

const Firebase = (props) => {
    const [isapion, setIsapion] = useState(false)
    const [user, setUser] = useState(null)

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
        if(app==null){
          app = initializeApp(firebaseConfig);
          setIsapion(true)
        }
        const analytics = getAnalytics(app);
      }, []);

      useEffect(() => {
        if(!isapion) return

        onAuthStateChanged((user)=>{
          setUser(user)
        })
      }, [isapion])
      

      if(!isapion)
      {
        return <div></div>
      }
  return (
    <FireContext.Provider value={{user}}>
        {props.children}
    </FireContext.Provider>
  )
}

export default Firebase