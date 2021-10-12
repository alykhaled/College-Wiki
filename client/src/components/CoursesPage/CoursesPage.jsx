import './coursesPage.scss'
import axios from "axios";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
function CoursesPage() {
    const {id} = useParams();
    const [course, setCourse] = useState();    
    const [lists, setLists] = useState([]);
    const [showNames, setShowNames] = useState(false);
    const [showCurrentSemster, setShowCurrentSemster] = useState(false);
    useEffect(() => {
        const getCourses = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/department/"+id+"/lists");
                setLists(res.data.lists);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
    }, [id]);

    return (
        <div className="coursespage">
            <div className="container">
                <h1>Filters</h1>
                <div className="filters">
                    <div className={(showNames ? "filterOption active" : "filterOption")} onClick={(e) => setShowNames(!showNames)}>
                        {showNames ? "Show Code" : "Show Names"}
                    </div>
                    <div className={(showCurrentSemster ? "filterOption active" : "filterOption")} onClick={(e) => setShowCurrentSemster(!showCurrentSemster)}>
                        {showCurrentSemster ? "Show All Courses" : "Show Open Courses"}
                    </div>
                </div>
                <hr />
                {lists.map(list => (
                    <div className="wrap">
                        <h1>{list.name}</h1>
                        <div className="courses">
                            {list.courses.map(currentCourse => (
                                (!showCurrentSemster | currentCourse.semester.includes("FALL")) ? <div className={currentCourse === course ? "course active" : "course"} onClick={() => setCourse(currentCourse)}>
                                    {showNames ? currentCourse.name : currentCourse.code}
                                </div> : ""
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {course !== undefined && <div className="courseInfo">
                <h3 className="courseCode">{course.code}</h3>
                <h1 className="courseName">{course.name}</h1>
                <h3>Credit Hours: {course.creditHours}</h3>
                <Link to={'/course/'+course.code}>View Full Page</Link>
                <hr/>
                <p>Semester: </p>
                <div className="courseSemester">{course !== undefined ? course.semester.map(sem => (
                    <div className="course">
                        {sem}
                    </div>
                )) : "No Semester"}</div>
                <hr/>
                <p className="coursePrereq">Prerequisite: {course.preReq !== [] ? course.preReq.map(course => (
                    <div className="course" onClick={() => setCourse(course)}>
                        {showNames ? course.name : course.code}
                    </div>
                )) : "No Prereq"}</p>
                {/* <p className="courseProfessor">Professor: {course.professor[0] !== undefined ? course.professor[0].name : ""}</p> */}
                <hr/>
                <p className="courseDesc">{course.description}</p>
            </div>}
        </div>
    )
}

export default CoursesPage 