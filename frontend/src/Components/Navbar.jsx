import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import profileImage from '../assets/Avatar-Profile.png';
import {ReportContext} from './ReportContext'
import {GoogleContext} from './GoogleContext'
import cookie from 'cookie'


export default function Navbar() {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false);
  const {reportList, setReportList, profile} = useContext(ReportContext)
  const [userProfile, setUserProfile] = useState();
  const {googleCreds} = useContext(GoogleContext)



  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetch("http://localhost:8080/report_data")
      .then((raw) => raw.json())
      .then((data) => setReportList(data));
  }, []);

  function logout(){
    document.cookie='login=false';
    navigate('/');
  }

  return (

    <div className={`${isExpanded ? 'w-3/4' : 'w-1/3'} fixed left-0 top-0 bottom-0 bg-gray-800 text-white transition-width duration-300 overflow-hidden`}>
       <div className="flex flex-col items-center h-full">
         <div className="flex items-center justify-between mt-4 mb-2" >
         {cookie.parse(document.cookie).login == 'true' ?
            (<div className= "relative my-2 mx-20 h-8 w-20 flex items-center justify-center rounded-xl bg-blue-700 hover:bg-blue-300" >
              <button type="button" onClick={logout}>Logout</button>
            </div>)
            :
            (<></>)
            }
           <div className="mt-4 mb-2 margin-10 flex items-center">
             <Link to="/profile">
               <img src={googleCreds ? googleCreds.picture : profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24" />
             </Link>
             {isExpanded ? (
               <div className="ml-4 text-left">
                 <span className="text-lg font-bold">First Name:{googleCreds ? googleCreds.Family_name : 'Loading'}</span><br/>
                 <span className="text-lg font-bold">Last Name:{googleCreds ? googleCreds.Family_name : 'Loading'}</span><br/>
                 <span className="text-lg font-bold" >Rank:{profile ? googleCreds.Family_name : 'Loading'}</span>
               </div>
             ) : undefined}
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
               <div className="flex flex-col justify-center items-start text-left pl-4">
                 {isExpanded ? (
                   <>
                   <span>
                   <span style={{ color: 'black' }}>Report:</span> {report.report_name} | <span style={{ color: 'black' }}>Mission #:</span> {report.mission_number} | <span style={{ color: 'black' }}>Date:</span> {report.date} <span style={{ color: 'black' }}>TPO:</span> {report.tpo}  |   <span style={{ color: 'black' }}>Mission #:</span> {report.mission_number} | <span style={{ color: 'black' }}>Eb/no:</span> {report.ebno} DB
                   </span>
                   </>
                 ) : (
                  <span>
                   <span style={{ color: 'black' }}>Report:</span> {report.report_name} | <span style={{ color: 'black' }}>Mission #:</span> {report.mission_number} | <span style={{ color: 'black' }}>Date:</span> {report.date}
                   </span>
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