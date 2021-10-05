import React, { useState } from 'react'
import SearchBar from '../../SearchBar/SearchBar';
import axios from 'axios';
import './course.scss'
function EditCourse() {
    const [courseData,setCourseData] = useState({});
    const [response, setResponse] = useState({});
    const [preReq, setPreReq] = useState([]);
    async function editCourse(e) 
    {
        e.preventDefault();
        try {
            // const res = await axios({
            //     method: 'put', //you can set what request you want to be
            //     url: process.env.REACT_APP_API+"/course/"+courseData._id,
            //     data: courseData,
            //     'headers': {
            //         'token': "Bearer " + localStorage.getItem("token"),
            //     }
            //   })
            const res = await axios.put(process.env.REACT_APP_API+"/course/"+courseData._id,courseData,{
                headers: {
                    token: "Bearer " + localStorage.getItem("token"),
                }
              });
            setResponse(res.data);
            console.log(res.data);
            setCourseData({});
            // history.push("/");
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
    function handleSearch(course) {
        setCourseData(course);
        console.log(course);
        setPreReq(course["preReq"]);
        // let list = courseData['preReq'];
        // console.log(list);
        // console.log(preReq);
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
        <div className="editcourse">
            <SearchBar callback={handleSearch} refresh={false} type="code"/>
            {<div className="mainForm" >
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
                        <input onChange={(e) => handleSemester(e)} checked={courseData.semester ? courseData.semester.includes("FALL") : false} type="checkbox" id="FALL" name="FALL"/>
                        <label htmlFor="FALL">FALL</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} checked={courseData.semester ? courseData.semester.includes("SPRING") : false} type="checkbox" id="SPRING" name="SPRING"/>
                        <label htmlFor="SPRING">SPRING</label>
                    </div>
                    <div style={{margin:"5px"}}>
                        <input onChange={(e) => handleSemester(e)} checked={courseData.semester ? courseData.semester.includes("SUMMER") : false} type="checkbox" id="SUMMER" name="SUMMER"/>
                        <label htmlFor="SUMMER">SUMMER</label>
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
                        <button>Update</button>
                    </div>
                </form>
            </div>}
            <p>{JSON.stringify(response)}</p>
        </div>
    )
}

export default EditCourse
