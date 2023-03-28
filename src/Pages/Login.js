import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    return (
        <div className="registeration-outer">
            <div className="registration-inner">

                <div className="font-22px">Login</div>
                <p><b>Remote Patient Monitoring System</b></p>

                <input placeholder="Enter username"
                    name="username"
                    type="text" 
                    className='emailinput'/>
                <input placeholder="Enter password"
                    name="password"
                    type="password" 
                    className='passinput'
                    />
                    <div className='passinput btnn'>
                        <b>Login</b>
                    </div>

                <div>
                    <p className="bold">
                        Forgot Password? <Link className='link' to={"https://github.com/Eby-Tom/RPMS-Patient-Panel"}><b className='dark-red'>Contact Us</b></Link>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Login