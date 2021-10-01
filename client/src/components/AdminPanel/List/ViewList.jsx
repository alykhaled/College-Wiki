import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './viewlist.scss'

function ViewList() {
    const {id} = useParams();
    const [list, setList] = useState({});
    const [query, setQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({});
    const [removedCourse, setRemovedCourse] = useState({});
    useEffect(() => {
        const getList = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/list/"+id);
                setList(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getCourses = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/course/");
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
                const res = await axios.put(process.env.REACT_APP_API+"/list/"+id+"/course",{course:course._id});
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        addCourse(course);
    }, [course]);
    useEffect(() => {
        const removeCourse = async (removedCourse) => 
        {
            console.log(course);
            try {
                const res = await axios.put(process.env.REACT_APP_API+"/list/"+id+"/deletecourse",{course:removedCourse._id});
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        removeCourse(removedCourse);
    }, [removedCourse]);

    function temp(course) {
        console.log("all");
    }
    function tempp(text) {
        console.log("Span");
    }
    function changeQuery(query) {
        console.log(query);
        setQuery(query);
    }
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
                    <div>
                        <li >{course.code} | {course.name}</li>
                        <span onClick={(e) => setRemovedCourse(course)}>
                            X
                        </span>
                    </div>
                ))}
            </div>
            <h1>All courses:</h1>
            <div className="searchInput">
                <input value={query} type="search" autocomplete="off" onChange={(e) => changeQuery(e.target.value)} placeholder="Search for course" id="searchInput" />
                {query !== "" && <div className="autoComplete">
                    {courses !== undefined && courses.map(course => (
                        <li onClick={(e) => setCourse(course)}>{course.code} | {course.name}</li>
                    ))}
                </div>}
            </div>
            {/* <div className="autoComplete">
                {courses !== undefined && courses.map(course => (
                    <li onClick={(e) => setCourse(course)}>{course.code} | {course.name}</li>
                ))}
            </div> */}
        </div>
    )
}

export default ViewList
