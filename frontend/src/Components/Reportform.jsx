import React, { useState } from 'react';

export default function Reportform() {
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCloseForm = () => {
    window.location.href = '/';
  }

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
            <label htmlFor="bigInput1" className="block mb-2 font-bold text-gray-700">
              Details:
            </label>
            <textarea
              id="bigInput1"
              name="bigInput1"
              value={form.bigInput1 || ''}
              onChange={handleChange}
              rows={4} // Set the number of rows
              placeholder={`
              Total Power Out (TPO): 
              Error to bit Noise Ratio: 
              Location: 
              Weather:
              `}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              style={{ whiteSpace: 'pre-line', textAlign: 'left' }}
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
      </form>
    </div>
  );
}
