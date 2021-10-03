import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './viewlist.scss'
import SearchBar from '../../SearchBar/SearchBar';

function ViewList() {
    const {id} = useParams();
    const [list, setList] = useState({});
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getList = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/list/"+id,{
                    headers: {
                        token: "Bearer " + localStorage.getItem("token"),
                    }
                  });
                setList(res.data);
                setCourses(res.data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, []);
    const addCourse = async (course) => 
    {
        await axios.put(process.env.REACT_APP_API+"/list/"+id+"/course",{course:course._id},{
        headers: {
            token: "Bearer " + localStorage.getItem("token"),
        }
        }).then((res)=>{
            courses.push(course)
            setCourses([...courses]);
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
            }
        });
    };

    const removeCourse = async (removedCourse) => 
    {
        try {
            const res = await axios.put(process.env.REACT_APP_API+"/list/"+id+"/deletecourse",{course:removedCourse._id});
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            console.log(error);
        }
        const index = courses.indexOf(removedCourse);
        if (index > -1) {
            courses.splice(index, 1);
            setCourses([...courses]);
        }
    };

    return (
        <div className="viewlist">
            <h1>{list.name}</h1>
            <h1>{list.department}</h1>
            <h1>{list.description}</h1>
            <div className="coursesOption">
                <div className="listCourses">
                    <h1>List Courses:</h1>
                    <div className="autoComplete">
                        {courses !== undefined && courses.map(course => (
                            <div>
                                <li>{course.code} | {course.name}</li>
                                <span onClick={(e) => removeCourse(course)}>
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="allCourses">
                    <h1>Add courses:</h1>
                    <SearchBar callback={addCourse}/> 
                </div>
            </div>
        </div>
    )
}

export default ViewList
