import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import EditableField from "./EditableField";

function DndCharacterSheetForm() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [characterSheet, setCharacterSheet] = useState({
    name: "",
    character_class: "",
    character_subclass: "",
    race: "",
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    background: "",
    alignment: "",
    experience_points: 0,
    inspiration: "",
    skill_proficiencies: "",
    saving_throw_proficiencies: "",
    other_proficiencies: "",
    passive_perception: 0,
    armor_class: 0,
    armor_class_notes: "",
    initiative: 0,
    speed: 0,
    maximum_hit_points: 0,
    current_hit_points: 0,
    temporary_hit_points: 0,
    total_hit_dice: "",
    current_hit_dice: "",
    death_saving_throws_successes: 0,
    death_saving_throws_failures: 0,
    attacks_and_spellcasting: "",
    weapons: "",
    equipment: "",
    treasure: "",
    personality_traits: "",
    ideals: "",
    bonds: "",
    flaws: "",
    features: "",
    age: "",
    height: "",
    weight: "",
    skin: "",
    eyes: "",
    hair: "",
    backstory: "",
    allies_and_organizations: "",
    spellcasting_class: "",
    spellcasting_ability: "",
    spellcasting_save_dc: 0,
    spellcasting_attack_bonus: 0,
    spells: "",
    cantrips: "",
    spell_slots_1_max: 0,
    spell_slots_1_current: 0,
    spells_selected_1: "",
    spell_slots_2_max: 0,
    spell_slots_2_current: 0,
    spells_selected_2: "",
    spell_slots_3_max: 0,
    spell_slots_3_current: 0,
    spells_selected_3: "",
    spell_slots_4_max: 0,
    spell_slots_4_current: 0,
    spells_selected_4: "",
    spell_slots_5_max: 0,
    spell_slots_5_current: 0,
    spells_selected_5: "",
    spell_slots_6_max: 0,
    spell_slots_6_current: 0,
    spells_selected_6: "",
    spell_slots_7_max: 0,
    spell_slots_7_current: 0,
    spells_selected_7: "",
    spell_slots_8_max: 0,
    spell_slots_8_current: 0,
    spells_selected_8: "",
    spell_slots_9_max: 0,
    spell_slots_9_current: 0,
    spells_selected_9: "",
    user_sub: `${user?.sub}`,
    dungeon_master_sub: ""
  });
  

  const url = 'http://localhost:8000/api/character_sheets/';


  useEffect(() => {
    console.log(characterSheet)
    // console.log(JSON.stringify(characterSheet.user_sub));
  }, [characterSheet]);

  const handleChange = (field, newValue) => {
    // const { name, value } = event.target;
    setCharacterSheet((prevState) => ({
      ...prevState,
      [field]: newValue,
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
        navigate('/characterlist');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="character-sheet">
      <form onSubmit={handleSubmit}>
      {Object.entries(characterSheet).map(([key, value]) => {
      if (key === "user_sub") {
        return null; // exclude this field from rendering
      }
      return (
        <EditableField
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={(newValue) => handleChange(key, newValue)}
        />
      );
    })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DndCharacterSheetForm;
