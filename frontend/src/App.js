
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Reportform from "./Components/Reportform";
import "./App.css";
import ReportContext from "./Components/ReportContext";
import ProfileBuilder from "./Components/ProfileBuilder";
import Profile from "./Routes/Profile";
import Report from "./Components/Report";
import Login from "./Components/Login";
import Globe from './Components/Globe';

function App() {
  const [reportList, setReportList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [logedin, setLogedin] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(null);
  const navigate = useNavigate();

  const handleGoBackNavbar = () => {
    navigate("/Navbar");
  };

  const handleGoBackProfile = () => {
    console.log("navigate");
    navigate("/profilebuild");
  };

  useEffect(() => {
    console.log(1);
    if (logedin === true && shouldNavigate) {
      console.log(2);
      if (shouldNavigate === "profile") {
        console.log(logedin);
        console.log(3);
        handleGoBackProfile();
      } else if (shouldNavigate === "navbar") {
        console.log(4);
        handleGoBackNavbar();
      }
    }
  }, [logedin, shouldNavigate]);

  const syncAccountDetails = async (accountDetails) => {
    const account = {
      oauth_sub: accountDetails.sub,
      userName: `${accountDetails.given_name}${
        accountDetails.family_name
      }${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`,
      email: accountDetails.email,
      user_group_id: 1,
    };

    console.log(account);
    try {
      const response = await fetch("http://localhost:8080/accounts_data", {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  async function LoginSponsoredByGoogle(creds) {
    console.log(creds.sub);
    const response = await fetch(
      `http://localhost:8080/accounts_data/${creds.sub}`
    );
    if (response.status === 404) {
      syncAccountDetails(creds);
      console.log(creds);
      setLogedin(true);
      setShouldNavigate("profile");
    } else if (response.status === 201 || response.status === 304) {
      let data = await response.json();
      console.log("here is the data from login", data);
      setProfile(data);
      setLogedin(true);
      setShouldNavigate("navbar");
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/report_data")
      .then((raw) => raw.json())
      .then((data) => setReportList(data));
  }, []);

  return (

    <ReportContext.Provider value={{ reportList, profile }}> 
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
        {/* {logedin ? (
          <> */}
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/Reportform" element={<Reportform />} />
        <Route path="/profilebuild" element={<ProfileBuilder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report/:id" element={<Report />} />
        {/* </>
        ) : (
          navigate("/")
        )} */}
      </Routes>
      </div>
    </ReportContext.Provider>
  );
}

export default App;
