import './coursesPage.scss'
import axios from "axios";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { Link,useHistory } from "react-router-dom";


function CoursesPage() {
    const history = useHistory();
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [course, setCourse] = useState();  
    const [courseID, setCourseID] = useState();  
    const [lists, setLists] = useState([]);
    const [showNames, setShowNames] = useState(false);
    const [showCurrentSemster, setShowCurrentSemster] = useState(false);

    useEffect(() => {
        const getMe = async () => 
        {
            let coursesCompleted = [];
            let coursesInProgress = [];
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/me/",{
                headers: {
                    token: "Bearer " + localStorage.getItem("token"),
                }});
                setUser(res.data);
                coursesCompleted = res.data.coursesCompleted;
                coursesInProgress = res.data.coursesInProgress;
                
            } catch (error) {
                // localStorage.removeItem("token");
                // localStorage.removeItem("isAdmin");
                console.log(error);
            }
            try {
                const ress = await axios.get(process.env.REACT_APP_API+"/department/"+id+"/lists");
                ress.data.lists.map(list => {
                    list.courses.map(course => {
                        if (coursesCompleted.find( ({ code }) => code === course.code )) {
                            course["completed"] = true;
                        }
                        else if (coursesInProgress.find( ({ code }) => code === course.code ))
                        {
                            course["inprogress"] = true;
                        }
                        
                    })
                });
                setLists(ress.data.lists);
                console.log(ress.data.lists);
            } catch (error) {
                console.log(error);
            }
        };
        getMe();
    }, [id]);

    //Change current course
    useEffect( async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API+"/course/"+courseID);
            setCourse(res.data);
        } catch (error) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("isAdmin");
            console.log(error);
        }
    }, [courseID]);


    return (
        <div className="coursespage">
            <div className="container">
                <h1>Filters</h1>
                <div className="filters">
                    <div className={(showNames ? "filterOption active" : "filterOption")} onClick={(e) => setShowNames(!showNames)}>
                        {showNames ? "Show Code" : "Show Names"}
                    </div>
                    <div className={(showCurrentSemster ? "filterOption active" : "filterOption")} onClick={(e) => setShowCurrentSemster(!showCurrentSemster)}>
                        {showCurrentSemster ? "Show All Courses" : "Show Current Semester Courses"}
                    </div>
                </div>
                <hr />
                {lists.map(list => (
                    <div className="wrap">
                        <h1>{list.name}</h1>
                        <div className="courses">
                            {list.courses.map(currentCourse => (
                                (!showCurrentSemster | currentCourse.semester.includes("FALL")) ? <div className={"course " + (currentCourse === course ? "active" : "") + (currentCourse.completed ? " completed" : "") + (currentCourse.inprogress ? "  inprogress" : "")} onClick={() => setCourseID(currentCourse._id)}>
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
                Prerequisite: 
                <p className="coursePrereq">
                {course.preReq.length !== 0 ? course.preReq.map(course => (
                    <div className="course" onClick={() => setCourseID(course._id)}>
                        {showNames ? course.name : course.code}
                    </div>
                )) : "None"}</p>
                <hr/>
                Is a Prerequisite for: 
                <p className="coursePrereq">
                {course.dependentCourses.length !== 0 ? course.dependentCourses.map(course => (
                    <div className="course" onClick={() => setCourseID(course._id)}>
                        {showNames ? course.name : course.code}
                    </div>
                )) : "None"}</p>
                {/* <p className="courseProfessor">Professor: {course.professor[0] !== undefined ? course.professor[0].name : ""}</p> */}
                <hr/>
                <p className="courseDesc">{course.description}</p>
            </div>}
        </div>
    )
}

export default CoursesPage 