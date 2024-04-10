import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Reportform from './Components/Reportform';
import './App.css';
import ReportContext from './Components/ReportContext'
import ProfileBuilder from './Components/ProfileBuilder';
import Profile from './Routes/Profile';


function App() {
  const [reportList, setReportList] = React.useState([])
  React.useEffect(() => {
    fetch('http://localhost:8080/report_data')
    .then(raw => raw.json())
    .then(data => setReportList(data))
  },[])
  return (
    <ReportContext.Provider value={{reportList}}>
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/Reportform" element={<Reportform/>} />
          <Route path="/profilebuild" element={<ProfileBuilder/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
    </ReportContext.Provider>
  );
}

export default App;
