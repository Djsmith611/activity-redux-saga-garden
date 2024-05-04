import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function PlantForm() {
  const dispatch = useDispatch(); // useDispatch hook
  const inputArray = [ // Setting up list of words to reuse
    "name",
    "kingdom",
    "clade",
    "order",
    "family",
    "subfamily",
    "genus",
  ]; 

  // Creating the initial state of the newPlant properties 
  const initialState = inputArray.reduce((acc, property) => {
    acc[property] = "";
    return acc;
  }, {}); 

  const [newPlant, setPlant] = useState(initialState);

  const handleChange = (event, valueToChange) => {
    event.preventDefault();
    setPlant({ ...newPlant, [valueToChange]: event.target.value });
  };

  const addNewPlant = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_PLANT", payload: newPlant });
    setPlant(initialState);
  };
  return (
    <div>
      <h3>Add a plant here</h3>
      <form onSubmit={addNewPlant}>
        {inputArray.map((item) => (
          <input
            key={item}
            type="text"
            value={newPlant[item]}
            onChange={(e) => handleChange(e, item)}
          />
        ))}
        <input type="submit" value="Add New Plant" />
      </form>
    </div>
  );
}
