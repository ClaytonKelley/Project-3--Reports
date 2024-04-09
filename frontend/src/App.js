import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Reportform from './Components/Reportform';
import './App.css';


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/Reportform" element={<Reportform/>} />
        </Routes>
    </div>
  );
}

export default App;
