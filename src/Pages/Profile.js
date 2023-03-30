import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FireContext } from '../Config/Firebase';
import { ChevronRightIcon, ShareAndroidIcon, SyncIcon, TrashIcon } from "@primer/octicons-react"
import Header from "../Components/Header"
import { getAuth, signOut } from "firebase/auth"
import { getDatabase, onValue, ref, set } from "firebase/database";
// import { GithubFilled, InstagramFilled, LinkedinFilled } from "@ant-design/icons"

const Profile = () => {

    const { user, userdetails } = useContext(FireContext)
    const [bookAppo, setbookAppo] = useState(false)
    const [date, setdate] = useState("")
    const [isloader, setisloader] = useState(false)

    const bookAppointment = (uid) => {
        setisloader(true)
        const db = getDatabase();
        set(ref(db, 'appointments/' + uid), {
            on: date
        }).then(
            setisloader(false),
            
        );
    }

    const deleteAppointment=()=>{
        const db = getDatabase();
        set(ref(db, 'appointments/' + userdetails.uid), {
            on: null
        })
    }


    const copyuid = () => {
        navigator.clipboard.writeText(userdetails.uid);
        alert(userdetails.uid)
    }

    const todaysDate=()=>{
        var today = new Date().toLocaleDateString('en-GB').split("/").reverse().join("-");
        console.log(today);
        return today
    }

    useEffect(() => {
        if(!userdetails.uid) return

        const db = getDatabase();
        const starCountRef = ref(db, 'appointments/' + userdetails.uid + '/on');
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if (data) {
                setdate(data);
                setbookAppo(false)
            }
            else
            {
                setdate("")
            }
        });

        return () => unsubscribe
    }, [userdetails.uid])


    return (
        <div>
            <Header />
            <div className="notification-page pos-r">
                <div className="notification profile">
                    <img className="userlogo" src="user.png" />
                    <div className="profile-head">
                        <h1>{userdetails.displayName}</h1>
                        <div onClick={() => copyuid()} className="copybtn">Patient UID</div>
                        {/* <b>{userdetails.uid}</b> */}
                    </div>
                    <div className="user-details">
                        <b>{userdetails.age}</b>
                    </div>
                    <div className="user-details">
                        <b>{userdetails.email}</b>
                    </div>
                    <div className="user-details">
                        <b>{userdetails.phone}</b>
                    </div>
                    <div className="docDetails">
                        <div><b>Dr. Lokesh</b></div>
                        <div><b>HK Hospital, Kengeri</b></div>
                        {
                            bookAppo ?
                                <div>
                                    <input className="cal" min={todaysDate()} value={date} onChange={(e) => setdate(e.target.value)} type="date" />
                                    <div className="dispflex">
                                        <div onClick={() => bookAppointment(userdetails.uid)} className="appoBtn">
                                            {isloader ?
                                                <div className="loader"></div>
                                                :
                                                <b>Book</b>

                                            }

                                        </div>
                                        <div onClick={() => setbookAppo(false)} className="appoBtn red">Cancel</div>
                                    </div>
                                </div>
                                :
                                date ?
                                <div className="afterbooked appoBtn">
                                    <div className="">Appointment on {date.split("-").reverse().join("-")}</div>
                                    <div onClick={()=>deleteAppointment()} className="trash"><TrashIcon size={16} /></div>
                                    </div>
                                    : 
                                    <div className="appoBtn" onClick={() => setbookAppo(true)}>Book Appointment</div>
                        } 
                    </div>
                    <div className="logoutbtn"><div onClick={() => {
                        signOut(getAuth()).then(() => {
                            // Sign-out successful.
                            console.log("logged out");
                        }).catch((error) => {
                            // An error happened.
                        });
                    }}><b>Logout</b></div></div>
                </div>

            </div>
        </div>
    )
}

export default Profile
