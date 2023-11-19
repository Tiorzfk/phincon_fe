import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { pokemonsReducer } from "./pokemons/pokemonSlice";
import storage from "./customStorage";
import logger from "redux-logger";

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;