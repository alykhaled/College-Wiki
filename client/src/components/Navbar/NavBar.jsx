import React, { useState } from 'react'
import './navbar.scss'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import logo from './img1.png'; // with import
function NavBar({signedIn}) {
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);
    const [searchType, setSearchType] = useState("code");
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
            <SearchBar callback={chooseCourse} type={searchType}/>
            <div style={{display:"flex"}}>
                <p style={{alignSelf:"center", marginRight:"5px"}}>Search By:</p> 
                <div style={{margin:"5px"}}>
                    <input checked={searchType === "code" ? true : false} onClick={() => setSearchType("code")} type="radio" id="codeNav" name="SearchNav"/>
                    <label style={{marginLeft:"5px"}} htmlFor="codeNav">Code</label>
                </div>
                <div style={{margin:"5px"}}>
                    <input checked={searchType === "name" ? true : false} onClick={() => setSearchType("name")} type="radio" id="nameNav" name="SearchNav"/>
                    <label style={{marginLeft:"5px"}} htmlFor="nameNav">Name</label>
                </div>
            </div>
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
                {signedIn && <li>
                    {/* <Link to="/login">
                        Login
                    </Link> */}
                    <div className="myaccount">
                        <Link to="/login">
                                My Account      
                        </Link>
                    </div>
                </li>}
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
