import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function AdminMain() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();
    const isAuthenticated = localStorage.getItem("isAdmin");
    if (!isAuthenticated) {
        history.push('/login');
    }
    return (
        <div>
            <h1>Yes</h1>
        </div>
    )
}

export default AdminMain
