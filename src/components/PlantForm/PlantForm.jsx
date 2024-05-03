import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PlantForm = () => {
  const dispatch = useDispatch();

  //Initial state is an OBJECT, with keys id and name
  let [newPlant, setPlant] = useState({
    name: "",
    kingdom: "",
    clade: "",
    order: "",
    family: "",
    subfamily: "",
    genus: "",
  });

  const handleChange = (event, valueToChange) => {
    switch (valueToChange) {
      case "name":
        setPlant({ ...newPlant, name: event.target.value });
      case "kingdom":
        setPlant({ ...newPlant, kingdom: event.target.value });
      case "clade":
        setPlant({ ...newPlant, clade: event.target.value });
      case "order":
        setPlant({ ...newPlant, order: event.target.value });
      case "family":
        setPlant({ ...newPlant, family: event.target.value });
      case "subfamily":
        setPlant({ ...newPlant, subfamily: event.target.value });
      case "genus":
        setPlant({ ...newPlant, genus: event.target.value });
    }
  };

  const addNewPlant = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_PLANT", payload: newPlant });
    setPlant({
      name: "",
      kingdom: "",
      clade: "",
      order: "",
      family: "",
      subfamily: "",
      genus: "",
    });
  };
  return (
    <div>
      <h3>This is the form</h3>
      <pre>{JSON.stringify(newPlant)}</pre>
      <form onSubmit={addNewPlant}>
        <input
          type="text"
          value={newPlant.name}
          onChange={() => handleChange("name")}
        />
        <input
          type="text"
          value={newPlant.kingdom}
          onChange={() => handleChange("kingdom")}
        />
        <input
          type="text"
          value={newPlant.clade}
          onChange={() => handleChange("clade")}
        />
        <input
          type="text"
          value={newPlant.order}
          onChange={() => handleChange("order")}
        />
        <input
          type="text"
          value={newPlant.family}
          onChange={() => handleChange("family")}
        />
        <input
          type="text"
          value={newPlant.subfamily}
          onChange={() => handleChange("subfamily")}
        />
        <input
          type="text"
          value={newPlant.genus}
          onChange={() => handleChange("genus")}
        />
        <input type="submit" value="Add New Plant" />
      </form>
    </div>
  );
};

export default PlantForm;
