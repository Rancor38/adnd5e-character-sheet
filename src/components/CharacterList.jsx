import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../djangocsrf/getCooke";


function CharacterList() {

  const [characters, setCharacters] = useState([])

  //useEffect to trigger an API call on the page load
  useEffect(() => {
    axios.get('api/character_sheets/')
      .then((res) => {
        // console.log(res.data)
        setCharacters(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {

    const csrftoken = getCookie('csrftoken')

    axios.delete(`api/character_sheets/${id}/`, {
      headers: {
        "X-CSRFToken": csrftoken, //You need this thing to do non-get requests from django
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // handle successful deletion
        console.log('Deleted character sheet with ID:', id);
      })
      .catch(error => {
        // handle error
        console.error('Error deleting character sheet:', error);
      });
  }

  return (
    <div>
      {characters.map(character => (
        <div key={character.id} className="character-list-card">
          <a href={`/character/${character.id}`}>
            <button>{character.name}</button>
          </a>
          <button
            onClick={() => handleDelete(character.id)}>Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
