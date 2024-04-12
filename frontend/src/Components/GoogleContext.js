import { createContext, useState} from 'react'; //add useEffect if you need to add a fetch again

export const GoogleContext = createContext();


export const GoogleProvider = ({ children }) => {
  const [googleCreds, setGoogleCreds] = useState({})



  // useEffect(() => {
  //    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  //      .then(response => response.json())
  //      .then(PokeData => setPokedata(PokeData.results))
  //      .catch(error => console.error('Error:', error));
  // }, []);

  return (
     <GoogleContext.Provider value={{
      googleCreds,
      setGoogleCreds,
      }}>
       {children}
     </GoogleContext.Provider>

  );
 };