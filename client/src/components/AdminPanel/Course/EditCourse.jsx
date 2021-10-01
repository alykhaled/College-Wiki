import React, { useState,useEffect } from 'react'
import SearchBar from '../../SearchBar/SearchBar';
import axios from 'axios';
import './course.scss'
function EditCourse() {
    const [courseData,setCourseData] = useState({
        id:"",
        name: "",
        code: "", 
        creditHours: 0, 
        description: "", 
    });
    const [response, setResponse] = useState({});
    const [query, setQuery] = useState("");
    const [suggested, setSuggested] = useState([]);
    const [visibile, setVisibile] = useState("hidden")
    async function editCourse(e) 
    {
        e.preventDefault();
        try {
            const res = await axios.put(process.env.REACT_APP_API+"/course/"+courseData.id,courseData);
            setResponse(res.data);
            console.log(res.data);
            // history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    function handle(e)
    {
        const newdata = {...courseData};
        newdata[e.target.id] = e.target.value;
        setCourseData(newdata);
        console.log(newdata);
    }

    useEffect(() => {
        async function getSearch(query) {
            const res = await axios.get(process.env.REACT_APP_API+"/course/?search="+query);
            setSuggested(res.data);
        }
        getSearch(query);
    }, [query])

    function changeQuery(query) {
        console.log(query);
        setQuery(query);
    }
    function chooseOption(course) {
        console.log(query);
        setQuery("");
        setCourseData({
            id: course._id,
            name: course.name,
            code: course.code, 
            creditHours: course.creditHours, 
            description: course.description, 
        });
        setVisibile("visible")
    }
    return (
        <div className="editcourse">
            <div className="searchInput">
                <input value={query} type="search" autocomplete="off" onChange={(e) => changeQuery(e.target.value)} placeholder="Search for course" id="searchInput" />
                {query !== "" && <div className="autoComplete">
                    {suggested.map(course => (
                        <li onClick={(e) => chooseOption(course)}>{course.code} | {course.name}</li>
                    ))}
                </div>}
            </div>
            <div className="mainForm" style={{visibility: visibile}}>
                <form onSubmit={(e) => editCourse(e)} className="formData">
                    <div className="inputField">
                        <label htmlFor="html">Name</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.name} placeholder="name" id="name" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">code</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.code} placeholder="department" id="code" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">creditHours</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.creditHours} placeholder="creditHours" id="creditHours" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="html">description</label>
                        <input onChange={(e) => handle(e)} type="text" value={courseData.description} placeholder="description" id="description" />
                    </div>
                    <div className="longBtn submit">
                        <button>Update</button>
                    </div>
                </form>
            </div>
            <p>{JSON.stringify(response)}</p>
        </div>
    )
}

export default EditCourse
