import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../djangocsrf/getCookie";

function EditCharacterSheetForm(props) {
  const [characterSheet, setCharacterSheet] = useState(props.character);
  
  useEffect(() => {
    // Set up timer to check for changes every 20 seconds
    const intervalId = setInterval(() => {
      // Compare current character sheet with original props.character
      if (JSON.stringify(characterSheet) !== JSON.stringify(props.character)) {
        handleSubmit();
      }
    }, 20000);

    // Cleanup function to clear timer
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterSheet, props.character]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharacterSheet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = (event) => {
    console.log("saved")
    event?.preventDefault();
    const csrftoken = getCookie("csrftoken");
    // console.log(JSON.stringify(characterSheet));
    
    axios.put(`http://localhost:8000/api/character_sheets/${props.character.id}/`, 
  {
    // data object with the updated values for the character sheet
    name: characterSheet.name,
    character_class: characterSheet.character_class,
    race: characterSheet.race,
    level: characterSheet.level,
    strength: characterSheet.strength,
    dexterity: characterSheet.dexterity,
    constitution: characterSheet.constitution,
    intelligence: characterSheet.intelligence,
    wisdom: characterSheet.wisdom,
    charisma: characterSheet.charisma,
    equipment: characterSheet.equipment,
    spells: characterSheet.spells,
    backstory: characterSheet.backstory,
  },
  {
    headers: {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
    },
  }
)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
  };

  return (
    <div className="character-sheet">
      <form onSubmit={handleSubmit}>
        <h1>Name:</h1>
        <label>
          <input type="text" name="name" value={characterSheet.name} onChange={handleChange} />
        </label>
        <h2>Class:</h2>
        <label>
          <input type="text" name="character_class" value={characterSheet.character_class} onChange={handleChange} />
        </label>
        <h2>Race:</h2>
        <label>
          <input type="text" name="race" value={characterSheet.race} onChange={handleChange} />
        </label>
        <h2>Level:</h2>
        <label>
          <input type="number" name="level" value={characterSheet.level} onChange={handleChange} />
        </label>
        <h2>Abilities:</h2>
        <label>
          <h3>Strength:</h3>
          <input type="number" name="strength" value={characterSheet.strength} onChange={handleChange} />
        </label>
        <label>
          <h3>Dexterity:</h3>
          <input type="number" name="dexterity" value={characterSheet.dexterity} onChange={handleChange} />
        </label>
        <label>
          <h3>Constitution:</h3>
          <input type="number" name="constitution" value={characterSheet.constitution} onChange={handleChange} />
        </label>
        <label>
          <h3>Intelligence:</h3>
          <input type="number" name="intelligence" value={characterSheet.intelligence} onChange={handleChange} />
        </label>
        <label>
          <h3>Wisdom:</h3>
          <input type="number" name="wisdom" value={characterSheet.wisdom} onChange={handleChange} />
        </label>
        <label>
          <h3>Charisma:</h3>
          <input type="number" name="charisma" value={characterSheet.charisma} onChange={handleChange} />
        </label>
        <h2>Equipment:</h2>
        <label>
          <textarea name="equipment" value={characterSheet.equipment} onChange={handleChange}></textarea>
        </label>
        <h2>Spells:</h2>
        <label>
          <textarea name="spells" value={characterSheet.spells} onChange={handleChange}></textarea>
        </label>
        <h2>Backstory:</h2>
        <label>
          <textarea name="backstory" value={characterSheet.backstory} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditCharacterSheetForm;
