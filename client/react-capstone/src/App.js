import React, { useState } from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Personal from './Components/Personal';
import Organization from './Components/Organization';
import DataTable from './Components/AdminPage';

import { UserContext } from './Components/UserContext';

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    email: "",
    organization_id: ""
  });

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Personal" element={<Personal />} />
            <Route path="/Organization" element={<Organization />} />
            <Route path="/admin" element={<DataTable />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
