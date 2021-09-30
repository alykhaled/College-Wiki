import React from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";

function NavBar() {
    return (
    <header>  
        <Link to="/">
            <h1 className="logo">Wiki</h1>
        </Link>
        <input type="search" placeholder="Search for course" name="" id="searchInput" />
        <nav>
            <ul className="nav_links">
                <li><a href="/">Courses</a></li>
                <li><a href="/">Make a Table</a></li>
                <li><a href="/">Guide</a></li>
                <li><a href="/">Feedback</a></li>
            </ul>
        </nav>
    </header>
    )
}

export default NavBar
