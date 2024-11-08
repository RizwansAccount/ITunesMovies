import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name : 'FavoriteReducer',
    initialState : { 
        favorites : []
    },
    reducers : {
        addToFavorites : (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites : (state, action) => {
            const selectedId = action.payload;
            const filteredFavorites = state.favorites.filter((f) => f?.id != selectedId);
            state.favorites = filteredFavorites;
        },
        emptyFavorites : (state) => {
            state.favorites = [];
        }
    }
});

export const { addToFavorites, removeFromFavorites, emptyFavorites } = slice.actions;

export const selectedFavoriteSelector =(state)=> state.FavoriteReducer.favorites;

export default slice.reducer;