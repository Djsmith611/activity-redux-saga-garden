import React, { useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Functional component will display a form where the user can add to the plant list
 * @returns a form with dynamically rendered inputs and will dispatch a POST through redux-saga
 */
export default function PlantForm() {
  const dispatch = useDispatch(); // useDispatch hook
  const inputArray = [
    // Setting up list of words to reuse
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

  // Using initialState as a starting point for newPlant
  const [newPlant, setPlant] = useState(initialState);

  // Dynamic change handler
  const handleChange = (e, valueToChange) => {
    e.preventDefault();
    setPlant({ ...newPlant, [valueToChange]: e.target.value });
  };

  // Begins a POST from redux-saga
  const addNewPlant = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_PLANT", payload: newPlant });
    setPlant(initialState);
  };

  return (
    <div>
      {/* <p>{JSON.stringify(newPlant)}</p> */}
      <form
        onSubmit={(e) => addNewPlant(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "50%",
          margin: "auto",
          border:"solid black 3px",
          borderRadius:"10px",
          padding:0,
          paddingTop:"10px",
          paddingBottom:"10px",
          backgroundColor:"grey"
        }}
      >
        {inputArray.map((item) => (
          <input
            key={item}
            type="text"
            value={newPlant[item]}
            placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
            onChange={(e) => handleChange(e, item)}
            style={{
              width: "97%",
              margin: "auto",
              borderRadius:"5px",
              textAlign:"center",
              backgroundColor:"black",
              color:"white",
              border:"solid cyan 1px"
            }}
          />
        ))}
        <input
          type="submit"
          value="Add New Plant"
          style={{
            width: "98%",
            margin: "auto",
            backgroundColor:"brown",
            color:"white",
            borderRadius:"5px",
            border:"solid black 3px"
          }}
        />
      </form>
    </div>
  );
};