import{useContext } from 'react';
import profileImage from '../assets/Avatar-Profile.png';
import {ReportContext} from './ReportContext'
import {GoogleContext} from './GoogleContext'
export default function EditableUserProfile() {
  const {profile} = useContext(ReportContext)
  const {googleCreds} = useContext(GoogleContext)

  // Handler for input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: value,
  //   }));
  // };


console.log(profile.rank)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 text-white">
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center w-3/8">
            {/* Profile Avatar */}
            <img src={googleCreds ? googleCreds.picture : profileImage} alt="Profile Avatar" className="rounded-full w-24 h-24 mr-8" />
            <div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              {/* User Name Display */}
              <div className="col-span-3">
                <label htmlFor="userName" className="block mb-2 font-bold text-gray-700">
                  User Name: {profile.username}
                </label>
              </div>
              {/* User Rank Input */}
              <div className="col-span-3">
                <label htmlFor="userRank" className="block mb-2 font-bold text-gray-700">
                  User Rank: {profile.rank}
                </label>
              </div>
              {/* User CHOPS Input */}
              <div className="col-span-3">
                <label htmlFor="userCHOPS" className="block mb-2 font-bold text-gray-700">
                  User CHOPS: {profile.chops}
                </label>
              </div>
              {/* User Squadron Input */}
              <div className="col-span-3">
                <label htmlFor="userSquadron" className="block mb-2 font-bold text-gray-700">
                  User Squadron: {profile.unit_id}
                </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
