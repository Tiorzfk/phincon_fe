import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        status: null,
        message: null,
        result: []
    },
    params: {
        limit: 100,
        page: 1,
        search: ''
    },
    detail: {
        name: ''
    }
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
        state.data = action.payload;
    },
    setParams: (state, action) => {
        state.params[action.payload.key] = action.payload.data;
    },
    setDetail: (state, action) => {
        state.detail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokemons, setParams, setDetail } = pokemonSlice.actions;

export const pokemonsReducer = pokemonSlice.reducer;