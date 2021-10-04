import React, { useState } from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import logo from './img1.png'; // with import
function NavBar() {
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);
    function chooseCourse(course) {
        history.push('/course/'+course.code)
    }
    return (
    <header>
        <div className={openMenu ? "miniMenu open" : "miniMenu"}>
            <ul className="miniMenuNav">
                <li>
                    <Link to="/departments" onClick={() => setOpenMenu(false)}>
                        Courses
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon" onClick={() => setOpenMenu(false)}>
                        Make a Table
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon" onClick={() => setOpenMenu(false)}>
                        Guide
                    </Link>
                </li>
                <li>
                    <Link to="/comingsoon" onClick={() => setOpenMenu(false)}>
                        Feedback
                    </Link>
                </li>
            </ul>
        </div>  
        <Link to="/" onClick={() => setOpenMenu(false)}>
            <img src={logo} alt="logo"/>
        </Link>
        <div style={{width:"500px"}}>
            <SearchBar callback={chooseCourse}/>
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
                    <a href="mailto:alykhaled2001@live.com">
                        Feedback
                    </a>
                </li>
            </ul>
        </nav>
        <div className={openMenu ? "menuBtn open" : "menuBtn"} onClick={() => setOpenMenu(!openMenu)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    )
}

export default NavBar
