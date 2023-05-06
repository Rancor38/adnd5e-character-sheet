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
    <div>
      {character ? <div>
      <h2> { character?.name }</h2 >
      <p>Class: {character?.class}</p>
      <p>Race: {character?.race}</p>
      <p>Level: {character?.level}</p>
      <h3>Abilities</h3>
      <p>Strength: {character?.strength}</p>
      <p>Dexterity: {character?.dexterity}</p>
      <p>Constitution: {character?.constitution}</p>
      <p>Intelligence: {character?.intelligence}</p>
      <p>Wisdom: {character?.wisdom}</p>
      <p>Charisma: {character?.charisma}</p>
      <h3>Equipment</h3>
      <p>{character?.equipment}</p>
      <h3>Spells</h3>
      <p>{character?.spells}</p>
      <h3>Backstory</h3>
      <p>{character?.backstory}</p>
      <EditCharacterSheetForm character={character} />
      </div> : null
      }
    </div >
  );
}

export default CharacterDetails