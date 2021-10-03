import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import './list.scss'
function AddList() {
    const history = useHistory();
    const isAuthenticated = localStorage.getItem("isAdmin");
    if (!isAuthenticated) {
        history.push('/login');
    }
    const [listData,setListData] = useState({
        name: "",
        department: "", 
        description: "", 
    });
    const [response, setResponse] = useState({});
    async function login(e) 
    {
        console.log(listData);
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API+"/list",listData,{
                headers: {
                    token: "Bearer " + localStorage.getItem("token"),
                }
              });
            setResponse(res.data);
            console.log(res.data);
            // history.push("/");
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            console.log(error);
        }
    };
    function handle(e)
    {
        const newdata = {...listData};
        newdata[e.target.id] = e.target.value;
        setListData(newdata);
        console.log(newdata);
    }
    return (
        <div className="list">
            <div className="mainForm">
                <form onSubmit={(e) => login(e)} className="formData">
                    <div className="inputField">
                        <label htmlFor="html">Name</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="name" id="name" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">Department</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="department" id="department" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">description</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="description" id="description" />
                    </div>
                    <div className="longBtn submit">
                        <button>LOG IN</button>
                    </div>
                </form>
            </div>
            <pre>{JSON.stringify(response)}</pre>
        </div>
    )
}

export default AddList
