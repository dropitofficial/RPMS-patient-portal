import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { FireContext } from '../Config/Firebase';
import { ChevronRightIcon, ShareAndroidIcon, SyncIcon } from "@primer/octicons-react"
import Header from "../Components/Header"
import { getAuth, signOut } from "firebase/auth"
// import { GithubFilled, InstagramFilled, LinkedinFilled } from "@ant-design/icons"

const Profile = () => {

    const { user } = useContext(FireContext)
    const [bookAppo, setbookAppo] = useState(false)

    return (
        <div>
            <Header />
            <div className="notification-page pos-r">
                <div className="notification profile">
                    <img className="userlogo" src="user.png" />
                    <div className="profile-head">
                        <h1>{user.displayName}</h1>
                        <b>{user.uid}</b>
                    </div>
                    {console.log(user)}
                    <div className="user-details">
                        <b>{user.photoURL.split('#')[0]}</b>
                    </div>
                    <div className="user-details">
                        <b>{user.email}</b>
                    </div>
                    <div className="user-details">
                        <b>{user.photoURL.split('#')[1]}</b>
                    </div>
                    <div className="docDetails">
                        <div><b>Dr. Lokesh</b></div>
                        <div><b>HK Hospital, Kengeri</b></div>
                        {
                            bookAppo ?
                                <div>
                                    <input className="cal" type="date" />
                                    <div className="dispflex">
                                        <div className="appoBtn">Book</div>
                                        <div onClick={()=>setbookAppo(false)} className="appoBtn red">Cancel</div>
                                    </div>
                                </div>
                                :
                                <div className="appoBtn" onClick={() => setbookAppo(true)} >Book Appointment</div>
                        }
                    </div>
                    <div className="logoutbtn"><div onClick={() => {
                        signOut(getAuth()).then(() => {
                            // Sign-out successful.
                            console.log("logged ou");
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
