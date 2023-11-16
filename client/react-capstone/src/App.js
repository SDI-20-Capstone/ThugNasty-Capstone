import React from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Personal from './Components/Personal';
import Organization from './Components/Organization';
import {  useState } from "react";
import { UserContext } from './Components/UserContext'

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    email: "",
  });



  return (
    <div className="App">
      <Router>
      <UserContext.Provider value={{ user, setUser }}>

        <Routes>
        <Route path='/' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path="/Personal" element={<Personal/>} />
          <Route path="/Organization" element={<Organization/>} />
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

