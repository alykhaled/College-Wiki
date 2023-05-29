import React from 'react'
import UserPage from '../UserPage/UserPage'
import { useState } from 'react';

import './UserNavbar.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import UserDashboard from '../UserDashboard/UserDashboard';
import UserCourses from '../UserPage/UserCourses';
export default function UserNavbar() {
    const [option, setOption] = useState("")

    return (
    <Router>
            <div className="outerWrap">
                <div className="UserNavBarAdmin">
                    <ul>
                        <Link to="/admin/list/add">
                            <li className={option === "addList" ? "active" : ""} onClick={() => setOption("addList")}>
                                <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z"/>
                                </svg>
                                </span>
                                <span className="title">
                                    Home
                                </span>
                            </li>
                        </Link>
                        <Link to="/admin/course">
                            <li className={option === "addCourse" ? "active" : ""} onClick={() => setOption("addCourse")}>
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z"/>
                                    </svg>
                                </span>
                                <span className="title">
                                    Edit Transcript
                                </span>
                            </li>
                        </Link>
                        <Link to="/admin/list/hem" >
                            <li className={option === "viewHEM" ? "active" : ""} onClick={() => setOption("viewHEM")}>
                                <span className="icon">
                                <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor" fillRule="evenodd"></path></svg>
                                </span>
                                <span className="title">
                                    Make Table
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <Switch>
                    <Route path="/">
                        <UserCourses/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
