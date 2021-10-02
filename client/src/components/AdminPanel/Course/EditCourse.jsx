import React, { useState,useEffect } from 'react'
import SearchBar from '../../SearchBar/SearchBar';
import axios from 'axios';
import './course.scss'
function EditCourse() {
    const [courseData,setCourseData] = useState({});
    const [response, setResponse] = useState({});

    async function editCourse(e) 
    {
        e.preventDefault();
        try {
            const res = await axios.put(process.env.REACT_APP_API+"/course/"+courseData._id,courseData);
            setResponse(res.data);
            console.log(res.data);
            setCourseData({});
            // history.push("/");
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
        if (newdata["semester"] === undefined) {
            newdata["semester"] = [];
        }

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
        <div className="editcourse">
            <SearchBar callback={setCourseData} refresh={false}/>
            <div className="mainForm" >
                <form onSubmit={(e) => editCourse(e)} className="formData">
                    <div className="inputField">
                        <label htmlFor="html">Name</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.name} placeholder="name" id="name" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">code</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.code} placeholder="department" id="code" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">creditHours</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.creditHours} placeholder="creditHours" id="creditHours" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">description</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.description} placeholder="description" id="description" />
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="FALL" name="FALL"/>
                        <label for="FALL">FALL</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SPRING" name="SPRING"/>
                        <label for="SPRING">SPRING</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} type="checkbox" id="SUMMER" name="SUMMER"/>
                        <label for="SUMMER">SUMMER</label>
                    </div>
                    <div className="longBtn submit">
                        <button>Update</button>
                    </div>
                </form>
            </div>
            <p>{JSON.stringify(response)}</p>
        </div>
    )
}

export default EditCourse
