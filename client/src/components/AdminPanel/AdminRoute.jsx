import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import AddList from './List/AddList';
import Course from './Course/Course';
import ViewList from './List/ViewList';

function AdminRoute() {
    const history = useHistory();
    const isAuthenticated = localStorage.getItem("isAdmin");
    if (!isAuthenticated) {
        history.push('/login');
    }
    return (
        <Router>
            <Switch>
                <Route path="/admin/list/add">
                    <AddList/>
                </Route>
                <Route path="/admin/list/:id/view">
                    <ViewList />
                </Route>
                <Route path="/admin/list">

                </Route>
                <Route path="/admin/course">
                    <Course/>
                </Route>
            </Switch>
        </Router>
    )
}

export default AdminRoute
