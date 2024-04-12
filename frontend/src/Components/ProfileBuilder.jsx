import { useState, useContext} from 'react';
import {ReportContext} from './ReportContext'
import {GoogleContext} from './GoogleContext'
import { useNavigate} from 'react-router-dom';


export default function ProfileBuilder() {
  const [form, setForm] = useState({});
  const {profile} = useContext(ReportContext)
  const {googleCreds} = useContext(GoogleContext)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form)
    console.log(profile)
  };

  const handleCloseForm = () => {
    window.location.href = '/';
  };

const updateUserData = async(event) => {
  event.preventDefault();
    const userdata = {
        username: form.username,
        rank : form.userRank,
        chops: form.userCHOPS,
        unit_id : 1,
    }
    console.log(userdata)
    console.log(googleCreds)
    try {
      const response = await fetch(`http://localhost:8080/update_account/${googleCreds.sub}`, {
        method: "PATCH",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigate("/Navbar");
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 text-white">
        <button onClick={handleCloseForm} className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold text-xl">
        </button>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 grid grid-cols-3 gap-4">
          {/* User Name Input */}
          <div className="col-span-3">
            <label htmlFor="userName" className="block mb-2 font-bold text-gray-700">
              User Name: {profile.username}
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={form.username|| ''}
              onChange={handleChange}
              placeholder="Enter user name"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          {/* User Rank Input */}
          <div className="col-span-3">
            <label htmlFor="userRank" className="block mb-2 font-bold text-gray-700">
              User Rank:
            </label>
            <input
              type="text"
              id="userRank"
              name="userRank"
              value={form.userRank || ''}
              onChange={handleChange}
              placeholder="Enter user rank"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          {/* User CHOPS Input */}
          <div className="col-span-3">
            <label htmlFor="userCHOPS" className="block mb-2 font-bold text-gray-700">
              User CHOPS:
            </label>
            <input
              type="text"
              id="userCHOPS"
              name="userCHOPS"
              value={form.userCHOPS || ''}
              onChange={handleChange}
              placeholder="Enter user CHOPS"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          {/* User Squadron Input */}
          <div className="col-span-3">
            <label htmlFor="userSquadron" className="block mb-2 font-bold text-gray-700">
              User Squadron:
            </label>
            <input
              type="text"
              id="userSquadron"
              name="userSquadron"
              value={form.userSquadron || ''}
              onChange={handleChange}
              placeholder="Enter user squadron"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button type="submit" onClick={updateUserData} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          <button type="button" onClick={handleCloseForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}
