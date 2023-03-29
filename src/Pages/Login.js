import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    const [isSignedup, setisSignedup] = useState(true)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [isloader, setisloader] = useState(false)

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth();

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
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
            });
    }

    return (
        <div className="registeration-outer">
            {
                isSignedup ?
                    <div className="registration-inner">

                        <div className="font-22px">Login</div>
                        <p><b>Remote Patient Monitoring System</b></p>

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
                        <div onClick={() => login()} className='passinput btnn'>
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

                        <input placeholder="Enter username"
                            name="username"
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className='emailinput' />
                        <input placeholder="Enter password"
                            name="password"
                            type="password"
                            value={email}
                            onChange={(e) => setpassword(e.target.value)}
                            className='passinput'
                        />
                        <div onClick={() => register()} className='passinput btnn'>
                            <b>Register</b>
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