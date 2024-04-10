import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Reportform from './Components/Reportform';
import './App.css';
import ProfileBuilder from './Components/ProfileBuilder';
import Profile from './Routes/Profile';


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/Reportform" element={<Reportform/>} />
          <Route path="/profilebuild" element={<ProfileBuilder/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
    </div>
  );
}

export default App;
