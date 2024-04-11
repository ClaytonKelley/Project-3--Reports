import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import ReportContext from './ReportContext'

export default function Report() {
  const navigate = useNavigate()
  const {reportList} = React.useContext(ReportContext)
  const {id} = useParams()
  let report = reportList.find(report => report.id == id)
  console.log(id)
  if(reportList.length == 0){
    return(<></>)
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 text-white">
        <button onClick={() => navigate('/navbar')} className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold text-xl">
        X
        </button>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <button onClick={() => navigate('/navbar')} className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold text-xl">
        X
      </button>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              MISSION:<br/>{report.mission_name || 'N/A'}
            </div>
          </div>
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              ORGANIZATION:<br/>{report.unit || 'N/A'}
            </div>
          </div>
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              SYSTEM:<br/>{report.terminal || 'N/A'}
            </div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              TEAM:<br/>{report.team_name || 'N/A'}
            </div>
          </div>
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              CHOPS:<br/>{report.chops || 'N/A'}
            </div>
          </div>
          <div>
            <div className="block mb-2 font-bold text-gray-400">
              IRON:<br/>{report.iron || 'N/A'}
            </div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="col-span-3 bg-gray-600 rounded-lg p-4">
            <div className="block mb-2 font-bold text-gray-400">
              Details:<br/>
              Total Power Out: {report.tpo || 'N/A'}<br/>
              Eb/No: {report.ebno || 'N/A'}<br/>
              Weather: {report.weather || 'N/A'}<br/>
              Location: {report.location || 'N/A'}<br/>
            </div>
          </div>
          <div className="col-span-3 bg-gray-600 rounded-lg p-4">
            <div className="block mb-2 font-bold text-gray-400">
              Comments:<br/>{report.comments || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}