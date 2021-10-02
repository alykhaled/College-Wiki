import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import './course.scss'
function Course() {
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
    async function addCourse(e) 
    {
        console.log(courseData);
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API+"/course",courseData);
            setResponse(res.data);
            console.log(res.data);
        } catch (error) {
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
                        <label style={{marginLeft:"5px"}} for="FALL">FALL</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SPRING" name="SPRING"/>
                        <label style={{marginLeft:"5px"}} for="SPRING">SPRING</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SUMMER" name="SUMMER"/>
                        <label style={{marginLeft:"5px"}} for="SUMMER">SUMMER</label>
                    </div>
                    <div className="longBtn submit">
                        <button>ADD COURSE</button>
                    </div>
                </form>
            </div>
            <p>{JSON.stringify(response)}</p>
        </div>
    )
}

export default Course
