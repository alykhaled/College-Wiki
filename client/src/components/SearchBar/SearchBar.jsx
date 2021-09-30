import React, { useState,useEffect } from 'react'
import axios from "axios";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggested, setSuggested] = useState([]);
    useEffect(() => {
        async function getSearch(query) {
            const res = await axios.get("https://collegewikiapi.herokuapp.com/api/course/?search="+query);
            setSuggested(res.data);
        }
        getSearch(query);
    }, [query])
    function changeQuery(query) {
        console.log(query);
        setQuery(query);
    }
    return (
        <div className="searchInput">
            <input type="search" onChange={(e) => changeQuery(e.target.value)} placeholder="Search for course" id="searchInput" />
            <div className="autoComplete">
                {suggested.map(course => (
                    <li>{course.code}</li>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
