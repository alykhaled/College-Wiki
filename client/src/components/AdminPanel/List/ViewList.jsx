import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './viewlist.scss'

function ViewList() {
    const {id} = useParams();
    const [list, setList] = useState({});
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({});
    useEffect(() => {
        const getList = async () => 
        {
            try {
                const res = await axios.get("http://localhost:8080/api/list/"+id);
                setList(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getCourses = async () => 
        {
            try {
                const res = await axios.get("http://localhost:8080/api/course/");
                setCourses(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
        getList();
    }, []);
    useEffect(() => {
        const addCourse = async (course) => 
        {
            console.log(course);
            try {
                const res = await axios.put("http://localhost:8080/api/list/"+id+"/course",{course:course._id});
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        addCourse(course);
    }, [course]);
    return (
        <div className="viewlist">
            <h1>{list.name}</h1>
            <h1>{list.department}</h1>
            <h1>{list.description}</h1>
            {/* <div className="autoComplete">
                <li>course.code | course.name</li>
            </div> */}
            <h1>List Courses:</h1>
            <div className="autoComplete">
                {list.courses !== undefined && list.courses.map(course => (
                    <li onClick={(e) => setCourse(course)}>{course.code} | {course.name}</li>
                ))}
            </div>
            <h1>All courses:</h1>
            <div className="autoComplete">
                {courses !== undefined && courses.map(course => (
                    <li onClick={(e) => setCourse(course)}>{course.code} | {course.name}</li>
                ))}
            </div>
        </div>
    )
}

export default ViewList
