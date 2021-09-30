import React from 'react';
import './App.scss';
import CoursesPage from './components/CoursesPage/CoursesPage';
import NavBar from './components/Navbar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import DepartmentsPage from './components/DepartmentsPage/DepartmentsPage';
import ComingSoon from './components/ComingSoon/ComingSoon';
import AdminMain from './components/AdminPanel/AdminMain/AdminMain';
import Login from './components/AdminPanel/Login/Login';
import List from './components/AdminPanel/List/List';
import Course from './components/AdminPanel/Course/Course';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/list">
          <List/>
        </Route>
        <Route path="/admin/course">
          <Course/>
        </Route>
        <Route path="/admin">
          <AdminMain/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/departments">
              <DepartmentsPage/>
            </Route>
            <Route path="/hem">
              <CoursesPage/>
            </Route>
            <Route path="/comingsoon">
              <ComingSoon />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
          <footer>
            Made by <a href="https://github.com/alykhaled">Aly Khaled</a>
          </footer>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
