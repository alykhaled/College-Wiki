import React from 'react';
import './App.scss';
import CoursesPage from './components/CoursesPage/CoursesPage';
import NavBar from './components/Navbar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="content">
        <CoursesPage/>
      </div>
      <footer>
        Made with love by Aly Khaled
      </footer>
    </div>
  );
}

export default App;
