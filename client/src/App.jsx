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
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/hem">
            <CoursesPage/>
          </Route>
          <Route path="/cce">
            cce
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        <footer>
          Made by Aly Khaled
        </footer>
      </div>
    </Router>
  );
}

export default App;
