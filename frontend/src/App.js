
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Reportform from './Components/Reportform';
import './App.css';
import ReportContext from './Components/ReportContext'
import ProfileBuilder from './Components/ProfileBuilder';
import Profile from './Routes/Profile';
import Report from './Components/Report';
import Login from './Components/Login';
import Globe from './Components/Globe';


function App() {
  const [reportList, setReportList] = React.useState([]);
  const [profile, setProfile] = React.useState([]);
  const [logedin, setLogedin] = React.useState(false);

  function LoginSponsoredByGoogle(creds) {
    console.log(creds.sub);
    // let mockUser = {
    //   oauth_sub: 109541936828133743248,
    //   username: "wghfw",
    //   rank: "O9",
    //   phone: 4739203,
    //   email: "thewrf@spaceforce.mil",
    //   chops: "PDE",
    //   unit_id: 1,
    //   user_group_id: 2,
    // };
    fetch(`http://localhost:8080/account_data/${creds.sub}`).then((res) => {
      if (res.status === 404) {
        console.log("post/create/set");
        //createProfile();
        //setProfile();
      } else if (res.status === 201) {
        let data = res.json();
        console.log("here is the data from login", data);
        setProfile(data);
        setLogedin(true);
      }
    });
    //with mock data
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/report_data")
      .then((raw) => raw.json())
      .then((data) => setReportList(data));
  }, []);

  return (
    <ReportContext.Provider value={{ reportList }}>
      {/* Globe component as background */}
      <div className="globe-background">
        <Globe/>
      </div>
      {/* Routes with a container for proper layering and styling */}
      <div className="routes-container">
       <Routes>
        <Route
          path="/"
          element={<Login LoginFunction={LoginSponsoredByGoogle} />}
        />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/Reportform" element={<Reportform />} />
        <Route path="/profilebuild" element={<ProfileBuilder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report/:id" element={<Report />} />
      </Routes>
      </div>
    </ReportContext.Provider>
  );
}

export default App;
