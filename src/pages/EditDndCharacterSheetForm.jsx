import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../djangocsrf/getCookie";
import { useAuth0 } from "@auth0/auth0-react";
import EditableField from "../components/characterSheetEdit/EditableField";
import FieldBatch from "../components/characterSheetEdit/FieldBatch";

function EditCharacterSheetForm(props) {
  const { user } = useAuth0();
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

  const handleChange = (key, newValue) => {
    setCharacterSheet((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    if (user.sub === characterSheet.user_sub) {

      console.log("saved")
      event?.preventDefault();
      const csrftoken = getCookie("csrftoken");
      // console.log(JSON.stringify(characterSheet));

      axios.put(`http://localhost:8000/api/character_sheets/${props.character.id}/`,
        {
          // data object with the updated values for the character sheet
          name: characterSheet.name,
          character_class: characterSheet.character_class,
          character_subclass: characterSheet.character_subclass,
          race: characterSheet.race,
          level: characterSheet.level,
          strength: characterSheet.strength,
          dexterity: characterSheet.dexterity,
          constitution: characterSheet.constitution,
          intelligence: characterSheet.intelligence,
          wisdom: characterSheet.wisdom,
          charisma: characterSheet.charisma,
          background: characterSheet.background,
          alignment: characterSheet.alignment,
          experience_points: characterSheet.experience_points,
          inspiration: characterSheet.inspiration,
          skill_proficiencies: characterSheet.skill_proficiencies,
          saving_throw_proficiencies: characterSheet.saving_throw_proficiencies,
          other_proficiencies: characterSheet.other_proficiencies,
          passive_perception: characterSheet.passive_perception,
          armor_class: characterSheet.armor_class,
          armor_class_notes: characterSheet.armor_class_notes,
          initiative: characterSheet.initiative,
          speed: characterSheet.speed,
          maximum_hit_points: characterSheet.maximum_hit_points,
          current_hit_points: characterSheet.current_hit_points,
          temporary_hit_points: characterSheet.temporary_hit_points,
          total_hit_dice: characterSheet.total_hit_dice,
          current_hit_dice: characterSheet.current_hit_dice,
          death_saving_throws_successes: characterSheet.death_saving_throws_successes,
          death_saving_throws_failures: characterSheet.death_saving_throws_failures,
          attacks_and_spellcasting: characterSheet.attacks_and_spellcasting,
          weapons: characterSheet.weapons,
          equipment: characterSheet.equipment,
          treasure: characterSheet.treasure,
          personality_traits: characterSheet.personality_traits,
          ideals: characterSheet.ideals,
          bonds: characterSheet.bonds,
          flaws: characterSheet.flaws,
          features: characterSheet.features,
          age: characterSheet.age,
          height: characterSheet.height,
          weight: characterSheet.weight,
          skin: characterSheet.skin,
          eyes: characterSheet.eyes,
          hair: characterSheet.hair,
          backstory: characterSheet.backstory,
          allies_and_organizations: characterSheet.allies_and_organizations,
          spellcasting_class: characterSheet.spellcasting_class,
          spellcasting_ability: characterSheet.spellcasting_ability,
          spellcasting_save_dc: characterSheet.spellcasting_save_dc,
          spellcasting_attack_bonus: characterSheet.spellcasting_attack_bonus,
          spells: characterSheet.spells,
          cantrips: characterSheet.cantrips,
          spell_slots_1_max: characterSheet.spell_slots_1_max,
          spell_slots_1_current: characterSheet.spell_slots_1_current,
          spells_selected_1: characterSheet.spells_selected_1,
          spell_slots_2_max: characterSheet.spell_slots_2_max,
          spell_slots_2_current: characterSheet.spell_slots_2_current,
          spells_selected_2: characterSheet.spells_selected_2,
          spell_slots_3_max: characterSheet.spell_slots_3_max,
          spell_slots_3_current: characterSheet.spell_slots_3_current,
          spells_selected_3: characterSheet.spells_selected_3,
          spell_slots_4_max: characterSheet.spell_slots_4_max,
          spell_slots_4_current: characterSheet.spell_slots_4_current,
          spells_selected_4: characterSheet.spells_selected_4,
          spell_slots_5_max: characterSheet.spell_slots_5_max,
          spell_slots_5_current: characterSheet.spell_slots_5_current,
          spells_selected_5: characterSheet.spells_selected_5,
          spell_slots_6_max: characterSheet.spell_slots_6_max,
          spell_slots_6_current: characterSheet.spell_slots_6_current,
          spells_selected_6: characterSheet.spells_selected_6,
          spell_slots_7_max: characterSheet.spell_slots_7_max,
          spell_slots_7_current: characterSheet.spell_slots_7_current,
          spells_selected_7: characterSheet.spells_selected_7,
          spell_slots_8_max: characterSheet.spell_slots_8_max,
          spell_slots_8_current: characterSheet.spell_slots_8_current,
          spells_selected_8: characterSheet.spells_selected_8,
          spell_slots_9_max: characterSheet.spell_slots_9_max,
          spell_slots_9_current: characterSheet.spell_slots_9_current,
          spells_selected_9: characterSheet.spells_selected_9,
          user_sub: characterSheet.user_sub,
          dungeon_master_email: characterSheet.dungeon_master_email
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
    } else return
  };

  // What do I need to do? I need to take the editablefield. I need to make a component for a list of different "blocks" like stats, etc. Then I can put those blocks in whatever locations I want. 
  //So I need to make a Stats.jsx that will contain a series of editable fields, each contained inside of their own div that can be independently styled.
  
  // ✅ or ❌
  //Step 1, see if I can put the Editable field inside of another div within the form. ✅
  //Make a component called a "FieldBatch" and that can render a series of EditableFields in a grouping. ✅ 
  //Make the FieldBatch take in an input of each field we want it to render within the batch, and have a classname we give it. ✅ 

  return (
    <div className="character-sheet">
      <form onSubmit={handleSubmit}>
      <EditableField
  key={1}
  label={Object.keys(characterSheet)[1]}
  value={characterSheet.name}
  onChange={(newValue) => handleChange('name', newValue)}
  className={characterSheet.name}
/>
    <FieldBatch characterSheet={characterSheet} handleChange={handleChange} className="class-subclass-level" specificItems={["character_class", "character_subclass", "level", "background", "race", "alignment", "experience_points"]}/>
    <FieldBatch characterSheet={characterSheet} handleChange={handleChange} className="class-subclass-level" specificItems={["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]}/>
        
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditCharacterSheetForm;
