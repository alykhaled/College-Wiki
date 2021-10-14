import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import './userpage.scss';
function UserPage() {
    const [completedCourses, setCompletedCourses] = useState([]);
    const [inProgressCourses, setInProgressCourses] = useState([]);
    const [User, setUser] = useState({});

    useEffect(() => {
        const getMe = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/me/",{
                headers: {
                    token: "Bearer " + localStorage.getItem("token"),
                }});
                setUser(res.data);
                setCompletedCourses(res.data.coursesCompleted);
                setInProgressCourses(res.data.coursesInProgress);
                console.log(res.data);
            } catch (error) {
                // localStorage.removeItem("token");
                // localStorage.removeItem("isAdmin");
                console.log(error);
            }
        };
        getMe();
    }, [])
    const addCourse = async (course) => 
    {
        await axios.put(process.env.REACT_APP_API+"/me/course/"+course._id,{},{
            headers: {
                token: "Bearer " + localStorage.getItem("token"),
            }
        });
        completedCourses.push(course)
        setCompletedCourses([...completedCourses]);
    };

    const addInProgressCourse = async (course) => 
    {
        await axios.put(process.env.REACT_APP_API+"/me/inprogress/"+course._id,{},{
            headers: {
                token: "Bearer " + localStorage.getItem("token"),
            }
        });
        inProgressCourses.push(course)
        setInProgressCourses([...inProgressCourses]);
    };

    // const removeCourse = async (removedCourse) => 
    // {
    //     try {
    //         await axios.put(process.env.REACT_APP_API+"/list/"+id+"/deletecourse",{course:removedCourse._id});
    //     } catch (error) {
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("isAdmin");
    //         console.log(error);
    //     }
    //     const index = courses.indexOf(removedCourse);
    //     if (index > -1) {
    //         courses.splice(index, 1);
    //         setCourses([...courses]);
    //     }
    // };
    return (
        <div className="userpage">
            <h1>{User.name}</h1>
            <h1>{User.department}</h1>
            {/* <h1>{list.description}</h1> */}
            <div className="main">
                <div className="coursesOption">
                    <div className="allCourses">
                        <h1>Add Completed courses:</h1>
                        <SearchBar callback={addCourse} type="code"/> 
                    </div>
                    <div className="listCourses">
                        <h1>List Courses:</h1>
                        <div className="autoComplete">
                            {completedCourses !== undefined && completedCourses.map(course => (
                                <div>
                                    <li>{course.code} | {course.name}</li>
                                    <span>
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>  
                </div>
                <div className="coursesOption">
                    <div className="allCourses">
                        <h1>Add InProgress courses:</h1>
                        <SearchBar callback={addInProgressCourse} type="code"/> 
                    </div>
                    <div className="listCourses">
                        <h1>List Courses:</h1>
                        <div className="autoComplete">
                            {inProgressCourses !== undefined && inProgressCourses.map(course => (
                                <div>
                                    <li>{course.code} | {course.name}</li>
                                    <span>
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default UserPage
