import { configureStore } from "@reduxjs/toolkit";
import { takeEvery, put } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import axios from "axios";

// SAGA MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();

// GET PLANTS GENERATOR FUNC
function* fetchPlants() {
  try {
    const plants = yield axios.get("/api/plants");
    yield put({ type: "SET_PLANT_LIST", payload: plants.data });
  } catch (err) {
    console.error("Something went wrong", err);
  }
};

// ROOT SAGA GENERATOR FUNC
function* rootSaga() {
  yield takeEvery("FETCH_PLANTS", fetchPlants);
};

// PLANT LIST REDUCER
const plantList = (state = [], action) => {
  switch (action.type) {
    case "SET_PLANT_LIST":
      return [...state, action.payload];
    default:
      return state;
  }
};

// STORE CONFIG
const store = configureStore({
  reducer: {
    plantList,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger, sagaMiddleware);
  }
});

// RUN SAGA
sagaMiddleware.run(rootSaga);

export default store;
