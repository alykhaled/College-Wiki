import React from 'react'
import './home.scss'
function Home() {
    return (
        <div className="home">
            <div className="mainImage">
                <h1>Can we help you ?</h1>
                <input type="search" placeholder="Search for course" name="" id="searchInput" />

            </div>
            <div className="options">
                <div className="item">
                    Courses
                </div>
                <div className="item">
                    Make a table
                </div>
                <div className="item">
                    Guide
                </div>
                <div className="item">
                    Guide
                </div>
                <div className="item">
                    Guide
                </div>
            </div>
        </div>
    )
}

export default Home
