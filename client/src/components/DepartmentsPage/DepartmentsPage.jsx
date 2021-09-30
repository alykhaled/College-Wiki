import React from 'react'
import './departmentsPage.scss'
import { Link } from "react-router-dom";

function DepartmentsPage() {
    return (
        <div className="departmentspage">
            <div className="options">
                <Link to="/hem">
                    <div className="item">
                        HEM
                        {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p> */}
                    </div>
                </Link>
                <Link to="/comingsoon">
                    <div className="item">
                        CCE
                        {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p> */}
                    </div>
                </Link>
                <Link to="/comingsoon">
                    <div className="item">
                        EEE
                        {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  impedit facere asperiores provident officiis?</p> */}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DepartmentsPage
