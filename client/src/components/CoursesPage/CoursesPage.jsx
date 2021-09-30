import React from 'react'
import './coursesPage.scss'
import axios from "axios";
import { useEffect,useState } from 'react';

function CoursesPage() {
    const [courses, setCourses] = useState([]);    
    const [course, setCourse] = useState();    
    const [firstYear, setfirstYear] = useState([]);    
    const [secondYear, setsecondYear] = useState([]);    
    const [thirdYear, setthirdYear] = useState([]);    
    useEffect(() => {
        const getCourses = async () => 
        {
            try {
                const res = await axios.get("https://collegewikiapi.herokuapp.com/api/course/");
                setCourses(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    const course = res.data[i];
                    if (course.code.includes("CMPN1") || course.code.includes("HEMN1") || course.code.includes("SBEN1")) 
                    {
                        setfirstYear(firstYearTemp => [...firstYearTemp, course]);
                    }
                    if (course.code.includes("CMPN2") || course.code.includes("HEMN2")|| course.code.includes("SBEN2")) 
                    {
                        setsecondYear(secondYearTemp => [...secondYearTemp, course]);
                    }
                    if (course.code.includes("CMPN3") || course.code.includes("HEMN3")|| course.code.includes("SBEN3")) 
                    {
                        setthirdYear(thirdYearTemp => [...thirdYearTemp, course]);
                    }
                }
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
    }, []);

    function chooseCourse(currentcourse)
    {
        setCourse(currentcourse);
        console.log(course);
    }
 
    return (
        <div className="coursespage">
            <div className="container">
                <h1>Discipline Requirements</h1>
                <div className="courses">
                    {firstYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                    {firstYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                    {firstYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                    {firstYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                </div>
                <h1>Major Requirements</h1>
                <div className="courses">
                    {secondYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                </div>
                <h1>Elective</h1>
                <div className="courses">
                    {thirdYear.map(course => (
                        <div className="course" onClick={() => chooseCourse(course)}>
                            {course.code}
                        </div>
                    ))}
                </div>
            </div>
            {course !== undefined && <div className="courseInfo">
                <h3 className="courseCode">{course.code}</h3>
                <h1 className="courseName">{course.name}</h1>
                <p className="courseDesc">{course.description}</p>
                <p className="courseProfessor">Professor: {course.professor[0].name}</p>
            </div>}
        </div>
    )
}

export default CoursesPage 
