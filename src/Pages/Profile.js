import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { FireContext } from '../Config/Firebase';
import { ChevronRightIcon, ShareAndroidIcon, SyncIcon } from "@primer/octicons-react"
import Header from "../Components/Header"
import { getAuth, signOut } from "firebase/auth"
// import { GithubFilled, InstagramFilled, LinkedinFilled } from "@ant-design/icons"

const Profile = () => {

    const { user, userdetails } = useContext(FireContext)
    const [bookAppo, setbookAppo] = useState(false)
    const [date, setdate] = useState("")

    const copyuid=()=>{
        navigator.clipboard.writeText(userdetails.uid);
    }

    return (
        <div>
            <Header />
            <div className="notification-page pos-r">
                <div className="notification profile">
                    <img className="userlogo" src="user.png" />
                    <div className="profile-head">
                        <h1>{userdetails.displayName}</h1>
                        <div onClick={()=>copyuid()} className="copybtn">Patient UID</div>
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
                                    <input className="cal" value={date} onChange={(e)=>setdate(e.target.value)} type="date" />
                                    <div className="dispflex">
                                        <div onClick={()=>console.log(date)} className="appoBtn">Book</div>
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
