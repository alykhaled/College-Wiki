import axios from 'axios';
import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';

function UserPage() {
    const [courses, setCourses] = useState([]);
    return (
        <div className="userpage">
            {/* <h1>{list.name}</h1> */}
            {/* <h1>{list.department}</h1> */}
            {/* <h1>{list.description}</h1> */}
            <div className="coursesOption">
                <div className="listCourses">
                    <h1>List Courses:</h1>
                    <div className="autoComplete">
                        {courses !== undefined && courses.map(course => (
                            <div>
                                <li>{course.code} | {course.name}</li>
                                <span>
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                </div>  
                <div className="allCourses">
                    <h1>Add courses:</h1>
                    {/* <SearchBar callback={addCourse} type="code"/>  */}
                </div>
            </div>
        </div>
    )
}

export default UserPage
