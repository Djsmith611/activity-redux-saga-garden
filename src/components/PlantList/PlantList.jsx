import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();
  const plantList = useSelector((store) => store.plantList);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PLANT", payload:id })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_PLANTS" });
  }, [dispatch]);

  return (
    <div style={{
        display:"flex",
        justifyContent:"space-between",
        margin:"auto",
        alignContent:"center",
        marginTop:"10px",
        width:"50%",
    }}>
      {plantList.map((plant) => (
        <div key={plant.id}
        style={{
            display:"flex",
            flexDirection:"column",
            color:"white",
            backgroundColor:"black",
            width:"fit-content",
            borderRadius:"10px",
            gap:0,
            textAlign:"left",
            padding:"10px",
        }}>
            <h2 style={{textAlign:"center"}}>{plant.name}</h2>
            <p>Kingdom: {plant.kingdom}</p>
            <p>Clade: {plant.clade}</p>
            <p>Order: {plant.order}</p>
            <p>Family: {plant.family}</p>
            <p>SubFamily: {plant.subfamily}</p>
            <p>Genus: {plant.genus}</p>
            <button onClick={() => handleDelete(plant.id)} >DELETE</button>
        </div>
      ))}
    </div>
  );
}

export default PlantList;
