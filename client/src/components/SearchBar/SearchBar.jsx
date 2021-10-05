import React, {useState,useEffect } from 'react'
import axios from "axios";

function SearchBar({callback,refresh,type}) {
    const [query, setQuery] = useState("");
    const [suggested, setSuggested] = useState([]);
    useEffect(() => {
        async function getSearch(query) {
            if (query !== "") {
                const res = await axios.get(process.env.REACT_APP_API+"/course/search/?q="+query+"&type="+type);
                setSuggested(res.data);
            }
        }
        getSearch(query);
    }, [query])
    function changeQuery(query) {
        // console.log(query);
        setQuery(query);
    }
    function chooseOption(course) {
        // console.log(course);
        setQuery("");
        callback(course);
        refresh && window.location.reload();
    }
    return (
        <div className="searchInput">
            <input value={query} type="search" autoComplete="off" onChange={(e) => changeQuery(e.target.value)} placeholder="Search for course" id="searchInput" />
            {query !== "" && <div className="autoComplete">
                {suggested.map(course => (
                    <li onClick={(e) => chooseOption(course)}>{course.code} | {course.name}</li>
                ))}
            </div>}
        </div>
    )
}

export default SearchBar
