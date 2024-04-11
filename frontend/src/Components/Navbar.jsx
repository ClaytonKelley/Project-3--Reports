import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import profileImage from '../assets/Avatar-Profile.png';
import ReportContext from './ReportContext'

export default function Navbar() {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false);
  const {reportList} = React.useContext(ReportContext)
  const [userProfile, setUserProfile] = useState({ userName: '', userRank: '', userSquadron: '', userCHOPS: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/profile');
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.log('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${isExpanded ? 'w-3/4' : 'w-1/3'} fixed left-0 top-0 bottom-0 bg-gray-800 text-white transition-width duration-300 overflow-hidden`}>
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="mt-4 mb-2 margin-10 flex items-center">
            <Link to="/profile">
              <img src={profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24" />
            </Link>
            {isExpanded && (
              <div className="ml-4 text-left">
                <div>Batman</div>
                <div>CMSgt</div>
                <div>1GOTH</div>
                <div>BTM</div>
                {/* <div className="text-lg font-bold">{userProfile.userName}</div>
                <div>{userProfile.userRank}</div>
                <div>{userProfile.userSquadron}</div>
                <div>{userProfile.userCHOPS}</div> */}
              </div>
            )}
          </div>
          <button onClick={toggleNavbar} className="p-2 mt-4 ml-20 text-white">
            {isExpanded ? '<' : '>'}
          </button>
        </div>
        <div className='relative my-2 flex items-center justify-center h-12 w-3/4 mx-auto rounded-xl bg-blue-700 hover:bg-blue-300'>
          <Link to="/Reportform">
            <button className="text-white">Create Report</button>
          </Link>
        </div>
        <div className='flex-grow overflow-y-auto w-full'>
          <ul className='flex flex-col items-center space-y-2 py-2'>
          {reportList.map((report, index) => (
              <li key={index} className='bg-gray-500 rounded-xl w-3/4 h-20 text-center flex justify-center items-center cursor-pointer hover:bg-gray-400' onClick={() => navigate(`/report/${report.id}`)}>
              <div className="flex flex-col justify-center items-start text-left pl-4"> {/* Adjusted for layout */}
                {/* Conditionally displaying information based on whether the navbar is expanded or not */}
                {isExpanded ? (
                  <>
                    <span>{`Report ID: ${report.id} Report Name: ${report.report_name} Date: ${report.date.toUpperCase()}`}</span>
                    {/* You can add more information here in a similar manner */}
                  </>
                ) : (
                  <span>{`Report Name: ${report.report_name}`}</span>
                )}
              </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}