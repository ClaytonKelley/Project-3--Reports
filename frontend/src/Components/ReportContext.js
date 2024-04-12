import { createContext, useState} from 'react'; //add useEffect if you need to add a fetch again

export const ReportContext = createContext();


export const ReportProvider = ({ children }) => {
  const [reportList, setReportList] = useState([])
  const [profile, setProfile] = useState({});


  // useEffect(() => {
  //    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  //      .then(response => response.json())
  //      .then(PokeData => setPokedata(PokeData.results))
  //      .catch(error => console.error('Error:', error));
  // }, []);

  return (
     <ReportContext.Provider value={{
      reportList, setReportList,
      profile, setProfile
      }}>
       {children}
     </ReportContext.Provider>

  );
 };