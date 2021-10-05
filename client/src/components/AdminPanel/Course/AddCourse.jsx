import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';

import axios from "axios";
import './course.scss'
function AddCourse() {
    const history = useHistory();
    const isAuthenticated = localStorage.getItem("isAdmin");

    if (!isAuthenticated) {
        history.push('/login');
    }
    const [courseData,setCourseData] = useState({
        name: "",
        code: "", 
        creditHours: 0, 
        description: "", 
        semester:[],
    });
    const [response, setResponse] = useState({});
    const [preReq, setPreReq] = useState([]);

    async function addCourse(e) 
    {
        console.log(courseData);
        courseData.name = courseData.name.replace(/\s/g, ""); 
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API+"/course",courseData,{
                headers: {
                    token: "Bearer " + localStorage.getItem("token"),
                }
              });
            setResponse(res.data);
            setPreReq([]);
            console.log(res.data);
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            console.log(error);
        }
    };
    function handle(e)
    {
        const newdata = {...courseData};
        newdata[e.target.id] = e.target.value;
        setCourseData(newdata);
        console.log(newdata);
    }
    function handleSemester(e)
    {
        const newdata = {...courseData};
        if (e.target.checked) {
            newdata["semester"].push(e.target.name);
        }
        else
        {
            const index = newdata["semester"].indexOf(e.target.name);
            if (index > -1) {
                newdata["semester"].splice(index, 1);
            }
        }
        setCourseData(newdata);
        console.log(newdata);
    }
    function addPreReq(course) {
        preReq.push(course);
        setPreReq([...preReq]);
        courseData.preReq = preReq;
        setCourseData(courseData);
    }
    function removePreReq(course) {
        const index = preReq.indexOf(course);
        if (index > -1) {
            preReq.splice(index, 1);
            setPreReq([...preReq]);
            courseData.preReq = preReq;
            setCourseData(courseData);
        }
    }
    return (
        <div className="courseAdmin">
            <div className="mainForm">
                <form onSubmit={(e) => addCourse(e)} className="formData">
                    <div className="inputField">
                        <label htmlFor="html">Name</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="name" id="name" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">Code:</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="Code" id="code" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">Credit Hours:</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="Credit Hours" id="creditHours" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">Description:</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="Description" id="description" />
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="FALL" name="FALL"/>
                        <label style={{marginLeft:"5px"}} htmlFor="FALL">FALL</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SPRING" name="SPRING"/>
                        <label style={{marginLeft:"5px"}} htmlFor="SPRING">SPRING</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SUMMER" name="SUMMER"/>
                        <label style={{marginLeft:"5px"}} htmlFor="SUMMER">SUMMER</label>
                    </div>
                    <SearchBar callback={addPreReq} type="code"/> 
                    <div className="autoComplete">
                        {preReq !== undefined && preReq.map(course => (
                            <div>
                                <li>{course.code} | {course.name}</li>
                                <span onClick={(e) => removePreReq(course)}>
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="longBtn submit">
                        <button>ADD COURSE</button>
                    </div>
                </form>
            </div>
            <p>{JSON.stringify(response).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
        </div>
    )
}

export default AddCourse
