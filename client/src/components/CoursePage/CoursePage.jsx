import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import axios from 'axios';
import './coursepage.scss'
function CoursePage() {
    const {code} = useParams();
    const [course, setCourse] = useState({});
    useEffect(() => {
        async function getCourse() 
        {
            let modeCode = code.replace(/\s/g, "");
            console.log("\""+modeCode+"\"");
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/course/?code="+modeCode);
                setCourse(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourse();
    }, [code])
    if (!course) {
        return(
            <h1>Loading</h1>
        )
    }
    function checkLinkType(link) {
        if (link.includes("drive.google")) {
            return "Google Drive"
        }
        else if (link.includes("youtube.com")) {
            return "Youtube"
        }
        else{
            return "Website"
        }
    }
    return (
        <div className="coursepage">
            <h3 className="courseCode">{course.code}</h3>
            <h1 className="courseName">{course.name}</h1>
            <hr/>
            <h3>Semester: </h3>
            <div className="courseSemester">{course.semester !== undefined ? course.semester.map(sem => (
                <div className="course">
                    {sem}
                </div>
            )) : "No Prereq"}</div>
            <hr/>
            <h3>Prerequisite: </h3>
            <div className="coursePrereq">{course.preReq !== undefined ? course.preReq.map(course => (
                <Link to={"/course/"+course.code}>
                    <div className="course">
                        {course.code}
                    </div>
                </Link>
            )) : "No Prereq" }</div>
            <hr/>
            <h3>Description: </h3>
            <p className="courseDesc">{course.description}</p>
            <hr/>
            <h3>Links: </h3>
            <div className="courseLinks">{course.links !== undefined ? course.links.map(link => (
                <li><a href={link}>{checkLinkType(link)}</a></li>
            )) : "No Prereq" }</div>
        </div>
    )
}

export default CoursePage
