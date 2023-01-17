import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchTerm = createAsyncThunk(
    "search/term",
    async(term) => {
        const response = await fetch(term);
        const data = await response.json();
        return data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState : {
        loaded : false,
        isLoading : false,
        hasError : false,
        searchData: {
            "data" : {
                "children" :[]
            }
        }
    },
    extraReducers : builder => {
        builder.addCase(searchTerm.pending, (state, action) => {
            state.isLoading = true;
            state.loaded = false;
            state.hasError = true;
        })
        .addCase(searchTerm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loaded = true;
            state.searchData = action.payload;
            state.hasError = false;
        })
        .addCase(searchTerm.rejected, (state, action) => {
            state.isLoading = false;
            state.loaded = false;
            state.hasError = false;
        })
    }
});

export default searchSlice.reducer;