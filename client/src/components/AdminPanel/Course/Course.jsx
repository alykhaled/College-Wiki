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
                        <label htmlFor="html">code</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="department" id="code" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">creditHours</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="creditHours" id="creditHours" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">description</label>
                        <input onChange={(e) => handle(e)} type="text" placeholder="description" id="description" />
                    </div>
                    <div>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="scales" name="FALL"/>
                        <label for="scales">FALL</label>
                    </div>
                    <div>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="scales" name="SPRING"/>
                        <label for="scales">SPRING</label>
                    </div>
                    <div>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="scales" name="SUMMER"/>
                        <label for="scales">SUMMER</label>
                    </div>
                    
                    <div className="longBtn submit">
                        <button>LOG IN</button>
                    </div>
                </form>
            </div>
            <p>{JSON.stringify(response)}</p>
        </div>
    )
}

export default Course
