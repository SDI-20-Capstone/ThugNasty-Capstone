import React from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<HomePage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignIn' element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

