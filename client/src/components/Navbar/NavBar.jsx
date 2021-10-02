import React from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import logo from './img1.png'; // with import
function NavBar() {
    return (
    <header>  
        <Link to="/">
            <img src={logo} />
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
