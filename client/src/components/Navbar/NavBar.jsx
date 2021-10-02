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
        <div style={{width:"500px"}}>
            <SearchBar/>
        </div>
        <nav>
            <ul className="nav_links">
                <li>
                    <Link to="/departments">
                        Courses
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon">
                        Make a Table
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon">
                        Guide
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon">
                        Feedback
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default NavBar
