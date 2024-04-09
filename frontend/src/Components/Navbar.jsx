import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/Avatar-Profile.png';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${isExpanded ? 'w-3/4' : 'w-1/3'} fixed left-0 top-0 bottom-0 bg-gray-800 text-white transition-width duration-300 overflow-hidden`}>
      <div className="flex flex-col items-center h-full">
     
        <button onClick={toggleNavbar} className="p-2 mt-4 text-white">
        {isExpanded ?  '<' : '>'}
      </button>

     
        <div className="mt-4 mb-2">
          <img src={profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24" />
        </div>

     
        <div className='relative my-2 flex items-center justify-center h-12 w-3/4 mx-auto rounded-full bg-blue-700 hover:bg-blue-300'>
          <Link to="/Reportform">
            <button className="text-white">Create Report</button>
          </Link>
        </div>

        <div className='flex-grow overflow-y-auto w-full'>
          <ul className='flex flex-col items-center space-y-2 py-2'>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 1</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 2</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 3</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 4</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 5</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 6</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 7</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 8</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 9</li>
            <li className='bg-gray-500 rounded-lg w-3/4 h-20 text-center flex justify-center items-center'>REPORT 10</li>

          </ul>
        </div>
      </div>
    </div>
  );
}