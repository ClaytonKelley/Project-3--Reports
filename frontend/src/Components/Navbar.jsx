import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/Avatar-Profile.png';
import ReportContext from './ReportContext'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {reportList} = React.useContext(ReportContext)

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('our_api');
  
        if (response.ok) {
          const reports = await response.json();
          setReports(reports);
        }
      } catch (error) {
        console.log('Failed to get reports', error);
      }
    };
  
    fetchReports();
  }, []);

  return (
    <div className={`${isExpanded ? 'w-3/4' : 'w-1/3'} fixed left-0 top-0 bottom-0 bg-gray-800 text-white transition-width duration-300 overflow-hidden`}>
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="mt-4 mb-2 margin-10">
            <Link to="/profile">
              <img src={profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24" />
            </Link>
          </div>
          <button onClick={toggleNavbar} className="p-2 mt-4 ml-20 text-white">
            {isExpanded ?  '<' : '>'}
          </button>
        </div>
        <div className='relative my-2 flex items-center justify-center h-12 w-3/4 mx-auto rounded-xl bg-blue-700 hover:bg-blue-300'>
          <Link to="/Reportform">
            <button className="text-white">Create Report</button>
          </Link>
        </div>

        <div className='flex-grow overflow-y-auto w-full'>
          <ul className='flex flex-col items-center space-y-2 py-2'>
            {reports.map((report, index) => (
              <Link key={report.id} to={`/report/${report.id}`}>
                <li className='bg-gray-500 rounded-xl w-3/4 h-20 text-center flex justify-center items-center cursor-pointer hover:bg-gray-400'>
                  {report.mission || report.system || report.squadron}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}