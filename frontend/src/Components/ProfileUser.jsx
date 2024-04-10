import React, { useState } from 'react';
import profileImage from '../assets/Avatar-Profile.png';

export default function EditableUserProfile() {
  const [profile, setProfile] = useState({
    userName: 'Batman',
    userRank: 'CMSgt',
    userCHOPS: 'BTM',
    userSquadron: '1 Goth',
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 text-white">
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center w-3/8">
        {/* Profile Avatar */}
        <img src={profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24 mr-8" />
        
        {/* User Info and Edit Inputs */}
        <div>
          <div className="mb-4">
            {/* Iterate over profile attributes for display and editing */}
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} className="flex items-center mb-4">
                <h2 className="block font-bold text-gray-700 mr-2 capitalize">
                  {key.replace('user', '')}: <span className="text-gray-600">{value}</span>
                </h2>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="ml-4 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
