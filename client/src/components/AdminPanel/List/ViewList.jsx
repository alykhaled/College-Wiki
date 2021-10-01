import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './viewlist.scss'
import SearchBar from '../../SearchBar/SearchBar';

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
    function handleChange(newValue) {
        setCourse(newValue);
    }

    return (
        <div className="viewlist">
            <h1>{list.name}</h1>
            <h1>{list.department}</h1>
            <h1>{list.description}</h1>
            <div className="coursesOption">
                <div className="listCourses">
                    <h1>List Courses:</h1>
                    <div className="autoComplete">
                        {list.courses !== undefined && list.courses.map(course => (
                            <div>
                                <li>{course.code} | {course.name}</li>
                                <span onClick={(e) => setRemovedCourse(course)}>
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="allCourses">
                    <h1>Add courses:</h1>
                    <SearchBar callback={handleChange}/> 
                </div>
            </div>
        </div>
    )
}

export default ViewList
