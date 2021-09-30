import React from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";

function NavBar() {
    return (
    <header>  
        <Link to="/">
            <h1 className="logo">Wiki</h1>
        </Link>
        <div className="searchInput">
            <input type="search" placeholder="Search for course" id="searchInput" />
            <div className="autoComplete">
                <li>CMPN103</li>
                <li>HEMN106</li>
                <li>HEMN106</li>
                <li>HEMN106</li>
                <li>HEMN106</li>
            </div>
        </div>
        <nav>
            <ul className="nav_links">
                <li>
                    <Link to="/hem">
                        Courses
                    </Link>
                </li>
                <li>
                    <Link to="/hem">
                        Make a Table
                    </Link>
                </li>
                <li>
                    <Link to="/hem">
                        Guide
                    </Link>
                </li>
                <li>
                    <Link to="/hem">
                        Feedback
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default NavBar
