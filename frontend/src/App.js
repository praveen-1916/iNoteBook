import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert'
import NoteState from './context/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';


function App() {

  return (
    <>
      <Router>
        <NoteState>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<SignUp />} />
            <Route exact path='/UserData' element={<UserAccount />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
