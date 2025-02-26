import { useState, useEffect } from 'react'
import './App.css'
import backGround from './assets/ME-background-img.jpeg';
import ScrollButton from "./components/topbutton.tsx"

function App() {

  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined>();

  useEffect (() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer tefzp3f24QrDRnZ8Mg1z'
    }

    // Fetch function containing a try/catch statement to improve user experience by showing if data is loading or not.
    const fetchAllCharacters = async () => {
      try {
        setIsLoading(true);
        const rawCharacter: Response = await fetch('https://the-one-api.dev/v2/character', {
          headers: headers,
        });
        const data = await rawCharacter.json();
        return data.docs; 
      } catch (error: unknown) {
          setError(error) 
      } finally {
          setIsLoading(false);
      }

    };
    
    fetchAllCharacters().then(characters => setData(characters))

  }, [])

  // Message to display if data is loading.
  if (isLoading) {
    return <div className='loading-state-msg'><p>Loading...</p></div>;
  }

  // Message to display if an error has occurred.
  if (error) {
    return <div className='loading-state-msg'><p>Something went wrong. Try refreshing the page.</p></div>
  }

  return (
    <div>
      <img src={backGround} alt="Map of Middle-Earth" className='bg-img'/>
      <h1>Search for a Character from the works of Tolkien</h1>
      <h2>Click their name to go to their Wiki page</h2>
      <input 
        type="text"
        placeholder='ex. Aragorn'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      <ScrollButton />

      {data.filter((character: undefined) =>{
        return (
          search.toLowerCase() === "" ? character : character.name.toLowerCase().includes(search)
        )
      }).map((character: undefined, index) => (
      
      <ul key={index}>
        <li><a href={character.wikiUrl}>{character.name}</a></li>
      </ul>
      
    ))}

    </div>
  )
}

export default App
