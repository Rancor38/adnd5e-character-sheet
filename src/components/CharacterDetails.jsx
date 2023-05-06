import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditCharacterSheetForm from './EditDndCharacterSheetForm';

function CharacterDetails() {

  const { id } = useParams();
  const [character, setCharacter] = useState(null)

  //useEffect to trigger an API call on the page load
  useEffect(() => {
    axios.get(`/api/character_sheets/${id}/`)
      .then((res) => {
        // console.log(res.data)
        setCharacter(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {character ? 
      <EditCharacterSheetForm character={character} />
       : null
      }
    </ >
  );
}

export default CharacterDetails