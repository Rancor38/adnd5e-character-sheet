import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../djangocsrf/getCookie";
import AreYouSure from "./AreYouSure";
import { useAuth0 } from "@auth0/auth0-react";

function CharacterList() {
  const { user } = useAuth0();
  const [characters, setCharacters] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/character_sheets/user/${user?.sub}`)
      .then((res) => {
        setCharacters(res.data);
      })
      .catch((err) => console.log(err));
  }, [user?.sub]);

  const handleDelete = (id) => {
    const csrftoken = getCookie("csrftoken");

    axios
      .delete(`http://localhost:8000/api/character_sheets/${id}/`, {
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Deleted character sheet with ID:", id);
        setCharacters(characters.filter((c) => c.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting character sheet:", error);
      });
  };

  const handleConfirmationYes = () => {
    setShowConfirmation(false);
    handleDelete(characterToDelete.id);
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
    setCharacterToDelete(null);
  };

  const handleDeleteButtonClick = (character) => {
    setShowConfirmation(true);
    setCharacterToDelete(character);
  };

  return (
    <div className="character-list">
      {showConfirmation ? (
        <AreYouSure name={characterToDelete.name}
          id={characterToDelete.id}
          handleNo={handleConfirmationNo}
          handleYes={handleConfirmationYes}
         />
      ) : (
        characters.map((character) => (
          <div key={character.id} className="character-list-card">
            <a href={`/character/${character.id}`}>
              <button>{character.name}</button>
            </a>
            <button onClick={() => handleDeleteButtonClick(character)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CharacterList;
