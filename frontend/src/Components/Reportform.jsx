import { useState, useContext } from 'react';
import {ReportContext} from './ReportContext'
import {useNavigate} from "react-router-dom";


export default function Reportform() {
  const [form, setForm] = useState({});
  const {profile} = useContext(ReportContext)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const navigate = useNavigate()

  const handleCloseForm = () => {
    window.location.href = '/navbar';
  };



  const handleSubmit = async (event) => {
      event.preventDefault();
      let ReportData = {
        report_name: 'WGS 24 Hour Report',
        unit: form.ORGANIZATION, //organization
        team_name: form.TEAM, //team
        mission_number: form.MISSION, //mission
        tpo: form.tpoInput,
        ebno: form.ebNoInput,
        ber: 'N/A',
        latitude: 'N/A',
        longitude: 'N/A',
        pim: 'N/A',
        weather: form.weatherInput,
        event:'N/A',
        terminal: 'N/A',
        opscap: 'N/A',
        syscap: 'N/A',
        hazcon: 'N/A',
        comments: form.bigInput2,
        user_id: 1,
        satellite_id: form.IRON, //This has to be a number input we havent figured this out with drop down and shit yet
        user_group_id: profile.user_group_id
      }
        try {
          const response = await fetch(`http://localhost:8080/report_data`, {
            method: "POST",
            body: JSON.stringify(ReportData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
        navigate("/navbar");
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 text-white">
        <button onClick={handleCloseForm} className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold text-xl">
        X
        </button>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="MISSION" className="block mb-2 font-bold text-gray-700">
              MISSION:
            </label>
            <input
              type="text"
              id="MISSION"
              name="MISSION"
              value={form.MISSION || ''}
              onChange={handleChange}
              placeholder="PW1234-24-C1"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="ORGANIZATION" className="block mb-2 font-bold text-gray-700">
              ORGANIZATION:
            </label>
            <input
              type="text"
              id="ORGANIZATION"
              name="ORGANIZATION"
              value={form.ORGANIZATION || ''}
              onChange={handleChange}
              placeholder="53SOPS"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="SYSTEM" className="block mb-2 font-bold text-gray-700">
              SYSTEM:
            </label>
            <input
              type="text"
              id="SYSTEM"
              name="SYSTEM"
              value={form.SYSTEM || ''}
              onChange={handleChange}
              placeholder="WGS 7"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="TEAM" className="block mb-2 font-bold text-gray-700">
              TEAM:
            </label>
            <input
              type="text"
              id="TEAM"
              name="TEAM"
              value={form.TEAM || ''}
              onChange={handleChange}
              placeholder="USS Washington"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="CHOPS" className="block mb-2 font-bold text-gray-700">
              CHOPS:
            </label>
            <input
              type="text"
              id="CHOPS"
              name="CHOPS"
              value={form.CHOPS || ''}
              onChange={handleChange}
              placeholder="CCK"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="IRON" className="block mb-2 font-bold text-gray-700">
              IRON:
            </label>
            <input
              type="text"
              id="IRON"
              name="IRON"
              value={form.IRON || ''}
              onChange={handleChange}
              placeholder="Steel"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="col-span-3 bg-gray-200 rounded-lg p-4">
  <div className="font-bold text-gray-700 mb-4">Details:</div>

  <label htmlFor="tpoInput" className="block mb-2 text-gray-700">
    Total Power Out (TPO):
  </label>
  <input
    id="tpoInput"
    name="tpoInput"
    value={form.tpoInput || ''}
    onChange={handleChange}
    placeholder="TPO"
    className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
  />

  <label htmlFor="ebNoInput" className="block mb-2 text-gray-700">
    Error to Bit Noise Ratio (Eb/No):
  </label>
  <input
    id="ebNoInput"
    name="ebNoInput"
    value={form.ebNoInput || ''}
    onChange={handleChange}
    placeholder="Eb/No"
    className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
  />

  <label htmlFor="locationInput" className="block mb-2 text-gray-700">
    Location:
  </label>
  <input
    id="locationInput"
    name="locationInput"
    value={form.locationInput || ''}
    onChange={handleChange}
    placeholder="Location"
    className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
  />

  <label htmlFor="weatherInput" className="block mb-2 text-gray-700">
    Weather:
  </label>
  <input
    id="weatherInput"
    name="weatherInput"
    value={form.weatherInput || ''}
    onChange={handleChange}
    placeholder="Weather"
    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
  />
</div>

          <div className="col-span-3 bg-gray-200 rounded-lg p-4">
            <label htmlFor="bigInput2" className="block mb-2 font-bold text-gray-700">
              Comments:
            </label>
            <textarea
              id="bigInput2"
              name="bigInput2"
              value={form.bigInput2 || ''}
              onChange={handleChange}
              rows={4} // Set the number of rows
              placeholder="There is shit everywhere, please send someone to clean up this shit."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3"> {/* Container for buttons with margin-top for spacing and flex to align buttons */}
          {/* Submit Button */}
          <button type="submit" onClick={(event) => handleSubmit(event)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          {/* Cancel Button - Calls handleCloseForm to simulate a cancel action */}
          <button type="button" onClick={handleCloseForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Cancel</button>
        </div>

      </form>
    </div>
  );
}
