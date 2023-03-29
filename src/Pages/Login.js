import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    const [isSignedup, setisSignedup] = useState(true)
    const [email, setemail] = useState("")
    const [age, setage] = useState("")
    const [phone, setphone] = useState("")
    const [dispName, setdispName] = useState("")
    const [password, setpassword] = useState("")
    const [isloader, setisloader] = useState(false)
    const [regerr, setregerr] = useState(false)
    const [loginerr, setloginerr] = useState(false)
    const [wrongCred, setwrongCred] = useState(false)

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth();

    const verifyLogin =()=>{
        setloginerr(false);
        setwrongCred(false)
        if(email==""||password=="")
        {
            setloginerr(true)
        }
        else{
            login()
        }
    }

    const verifyRegister =()=>{
        setregerr(false)
        setwrongCred(false)
        if(dispName==""||phone==""||age==""||email==""||password=="")
        {
            setregerr(true)
        }
        else{
            register()
        }
    }

    const register = () => {
        setisloader(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: dispName, photoURL: age+"#"+phone
                }).then(() => {
                    console.log("inserted@!!@");
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                setisloader(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setisloader(false);
                setwrongCred(true);
                // ..
            });



    }

    const login = () => {
        setisloader(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                setisloader(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setisloader(false);
                setwrongCred(true);
            });
    }

    return (
        <div className="registeration-outer">
            {
                isSignedup ?
                    <div className="registration-inner">

                        <div className="font-22px">Login</div>
                        <p><b>Remote Patient Monitoring System</b></p>
                        {
                            loginerr&&
                            (<h3 className='errmssg'>Enter all feilds to continue</h3>)
                        }
                        {
                            wrongCred&&
                            <h3 className='errmssg'>Check Credentials</h3>
                        }
                        <input placeholder="Enter email"
                            name="username"
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className='emailinput' />
                        <input placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            type="password"
                            className='passinput'
                        />
                        <div onClick={() => verifyLogin()} className='passinput btnn'>
                            {isloader ?
                                <div className="loader"></div>
                                :
                                <b>Login</b>

                            }
                        </div>

                        <div>
                            <p className="bold">
                                Not registered yet? <Link className='link' onClick={() => { setisSignedup(false) }}><b className='dark-red'>Register</b></Link>
                            </p>

                        </div>
                    </div>
                    :
                    <div className="registration-inner">

                        <div className="font-22px">Register</div>
                        <p><b>Remote Patient Monitoring System</b></p>
                        {
                            regerr&&
                            <h3 className='errmssg'>Enter all feilds to continue</h3>
                        }
                        {
                            wrongCred&&
                            <h3 className='errmssg'>Check Credentials</h3>
                        }
                        <input placeholder="Enter display name"
                            name="password"
                            type="text"
                            value={dispName}
                            onChange={(e) => setdispName(e.target.value)}
                            className='passinput'
                        />
                        <input placeholder="Enter age"
                            name="password"
                            type="text"
                            value={age}
                            onChange={(e) => setage(e.target.value)}
                            className='passinput'
                        />
                        <input placeholder="Enter phone number"
                            name="password"
                            type="text"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                            className='passinput'
                        />
                        <input placeholder="Enter username"
                            name="username"
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className='emailinput' />
                        <input placeholder="Enter password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className='passinput'
                        />
                        <div onClick={() => verifyRegister()} className='passinput btnn'>
                            {isloader ?
                                <div className="loader"></div>
                                :
                                <b>Register</b>
                            }
                        </div>

                        <div>
                            <p className="bold">
                                already registered? <Link className='link' onClick={() => setisSignedup(true)}><b className='dark-red'>Login</b></Link>
                            </p>

                        </div>
                    </div>
            }


        </div>
    )
}

export default Login