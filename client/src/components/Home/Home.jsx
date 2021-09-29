import React from 'react'
import './home.scss'
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="home">
            <div className="mainImage">
                <h1>CAN WE HELP YOU ?</h1>
                <input type="search" placeholder="Search for course" name="" id="searchInput" />

            </div>
            <div className="options">
                <Link to="/hem">
                    <div className="item">
                        Courses
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p>
                    </div>
                </Link>
                <div className="item">
                    Make a table
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. impedit facere asperiores provident officiis?</p>
                </div>
                <div className="item">
                    Guide
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p>
                </div>
                <div className="item">
                    Guide
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. impedit facere asperiores provident officiis?</p>
                </div>
                <div className="item">
                    Guide
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p>
                </div>
            </div>
        </div>
    )
}

export default Home
