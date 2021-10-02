import React, { useEffect, useState } from 'react'
import { useParams,useHistory} from 'react-router-dom'
import axios from 'axios';
import './coursepage.scss'
function CoursePage() {
    const {code} = useParams();
    const [course, setCourse] = useState({});
    useEffect(() => {
        async function getCourse(e) 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/course/?code="+code);
                setCourse(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourse();
    }, [])
    if (!course) {
        return(
            <h1>Loading</h1>
        )
    }
    return (
        <div className="coursepage">
            <h3 className="courseCode">{course.code}</h3>
            <h1 className="courseName">{course.name}</h1>
            <hr/>
            <p>Semester: </p>
            <div className="courseSemester">{course.semester !== undefined ? course.semester.map(sem => (
                <div className="course">
                    {sem}
                </div>
            )) : "No Prereq"}</div>
            <hr/>
            <p className="coursePrereq">Prerequisite: {course.preReq !== undefined ? course.preReq.map(course => (
                <div className="course">
                    {course.code}
                </div>
            )) : "No Prereq"}</p>
            <hr/>
            <p className="courseDesc">{course.description}</p>
            <hr/>
        </div>
    )
}

export default CoursePage
