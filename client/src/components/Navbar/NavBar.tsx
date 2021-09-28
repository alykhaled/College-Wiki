import React from 'react'

function NavBar() {
    return (
    <header>  
        <h1 className="logo">Collge Wiki</h1>
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
