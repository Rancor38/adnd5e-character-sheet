import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function DndCharacterSheetForm() {
  const { user } = useAuth0();
  const [characterSheet, setCharacterSheet] = useState({
    name: "",
    character_class: "",
    race: "",
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    equipment: "",
    spells: "",
    backstory: "",
    email: "",
    user_sub: `${user?.sub}`,
  });

  const url = 'http://localhost:8000/api/character_sheets/';


  useEffect(() => {
    // console.log(JSON.stringify(characterSheet.user_sub));
  }, [characterSheet]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharacterSheet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(characterSheet));
    const config = {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(characterSheet),
      method: 'POST'
    }
    axios.post(url, JSON.stringify(characterSheet), config)
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
        <label>
          Name:
          <input type="text" name="name" value={characterSheet.name} onChange={handleChange} />
        </label>
        <label>
          Class:
          <input type="text" name="character_class" value={characterSheet.character_class} onChange={handleChange} />
        </label>
        <label>
          Race:
          <input type="text" name="race" value={characterSheet.race} onChange={handleChange} />
        </label>
        <label>
          Level:
          <input type="number" name="level" value={characterSheet.level} onChange={handleChange} />
        </label>
        <label>
          Strength:
          <input type="number" name="strength" value={characterSheet.strength} onChange={handleChange} />
        </label>
        <label>
          Dexterity:
          <input type="number" name="dexterity" value={characterSheet.dexterity} onChange={handleChange} />
        </label>
        <label>
          Constitution:
          <input type="number" name="constitution" value={characterSheet.constitution} onChange={handleChange} />
        </label>
        <label>
          Intelligence:
          <input type="number" name="intelligence" value={characterSheet.intelligence} onChange={handleChange} />
        </label>
        <label>
          Wisdom:
          <input type="number" name="wisdom" value={characterSheet.wisdom} onChange={handleChange} />
        </label>
        <label>
          Charisma:
          <input type="number" name="charisma" value={characterSheet.charisma} onChange={handleChange} />
        </label>
        <label>
          Equipment:
          <textarea name="equipment" value={characterSheet.equipment} onChange={handleChange}></textarea>
        </label>
        <label>
          Spells:
          <textarea name="spells" value={characterSheet.spells} onChange={handleChange}></textarea>
        </label>
        <label>
          Backstory:
          <textarea name="backstory" value={characterSheet.backstory} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DndCharacterSheetForm;
