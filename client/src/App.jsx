import './App.scss';
import CoursesPage from './components/CoursesPage/CoursesPage';
import NavBar from './components/Navbar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import DepartmentsPage from './components/DepartmentsPage/DepartmentsPage';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Login from './components/AdminPanel/Login/Login';
import AdminRoute from './components/AdminPanel/AdminRoute';
import CoursePage from './components/CoursePage/CoursePage';
import TablePage from './components/TablePage/TablePage';
import MyTable from './components/MyTable/MyTable';
import { useState } from 'react';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminRoute/>
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
            <Route path="/course/:code">
              <CoursePage />
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
            <Route path="/:id">
              <CoursesPage/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          <footer>
            Unofficial Wiki and Guide for Cairo University Faculty of Engineering<br/>
            Made by <a href="https://github.com/alykhaled">Aly Khaled</a>
          </footer>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
