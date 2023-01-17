import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers : {
        add(state, action){
            state.push(action.payload);
        },
        remove(state, action){
            return state.filter(item => item !== action.payload);
        }
    }
})

export const {add, remove} = favoritesSlice.actions;
export default favoritesSlice.reducer;