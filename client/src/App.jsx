import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios        from 'axios';
import CoursesPage  from './components/CoursesPage/CoursesPage';
import NavBar       from './components/Navbar/NavBar';
import Home         from './components/Home/Home';
import DepartmentsPage from './components/DepartmentsPage/DepartmentsPage';
import ComingSoon   from './components/ComingSoon/ComingSoon';
import Login        from './components/AdminPanel/Login/Login';
import AdminRoute   from './components/AdminPanel/AdminRoute';
import CoursePage   from './components/CoursePage/CoursePage';
import TablePage    from './components/TablePage/TablePage';
import MyTable      from './components/MyTable/MyTable';
import UserPage     from './components/User/UserPage/UserPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserNavbar from './components/User/UserNavbar/UserNavbar';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminRoute/>
        </Route>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/departments">
              <DepartmentsPage/>
            </Route>
            <Route path="/course/:code">
              <CoursePage />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="/comingsoon">
              <ComingSoon />
            </Route>
            <Route path="/mytable">
              <MyTable />
            </Route>
            <Route path="/table">
              <TablePage />
            </Route>
            <Route path="/me">
              <UserNavbar/>
            </Route>
            <Route path="/:id">
              <CoursesPage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          <footer>
            Unofficial Wiki and Guide for Cairo University Faculty of Engineering<br/>
            Made by <a href="https://github.com/alykhaled">Aly Khaled</a><br/>
            Special Thanks for Omar Yasser (Nona's Husband) and Ziad Mohamed (Zooz's Husband)
          </footer>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
