import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import './login.scss'

function Login() {
    const history = useHistory();
    const [registerData,setRegisterData] = useState({
        username: "",
        password: "" 
    });
    async function login(e) 
    {
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API+"/auth/login",registerData);
            console.log(res.data);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("isAdmin",res.data.isAdmin);
            history.push("/admin/");
        } catch (error) {
            console.log(error);
        }
    };
    function handle(e)
    {
        const newdata = {...registerData};
        newdata[e.target.id] = e.target.value;
        setRegisterData(newdata);
        console.log(newdata);
    }
    return (
        <div className="login">
            <div className="mainForm">
                <form onSubmit={(e) => login(e)} className="formData">
                    <div className="inputField">
                        <label htmlFor="html">username</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="username" id="username" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">Password</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="password" id="password" />
                    </div>
                    <div className="longBtn submit">
                        <button>LOG IN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
