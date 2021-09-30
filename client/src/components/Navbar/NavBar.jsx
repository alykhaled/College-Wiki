import React from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

function NavBar() {
    return (
    <header>  
        <Link to="/">
            <h1 className="logo">Wiki</h1>
        </Link>
        <SearchBar/>
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
