import React from 'react'
import './home.scss'
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
function Home() {

    return (
        <div className="home">
            <div className="mainImage">
                <h1>CAN WE HELP YOU ?</h1>
                <SearchBar />
            </div>
            <div className="options">
                <Link to="/departments">
                    <div className="item">
                        <h3>Courses</h3>
                        <p>Browse all the courses according to your department</p>
                    </div>
                </Link>
                <Link to="/comingsoon">
                    <div className="item">
                        <h3>Make a table</h3>
                        <p>Customize your own table with a much cooler UI than your college's shitty website</p>
                    </div>
                </Link>
                <Link to="/comingsoon">
                    <div className="item">
                        <h3>Guide</h3>
                        <p>Some advices from students with lower than 3 GPA</p>
                    </div>
                </Link>
                <Link to="/comingsoon">
                    <div className="item">
                        <h3>Feedback</h3>
                        <p>Send us your feedback in case we need it (Most probably we don't care)</p>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Home
