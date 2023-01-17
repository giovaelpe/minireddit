import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const endpoint = "https://www.reddit.com/r/popular.json";

export const loadPopular = createAsyncThunk(
    "popular/load",
    async() => {
        const response = await fetch(endpoint);
        const json = await response.json();
        return json;
    }
);

const popularSlice = createSlice({
    name: "popular",
    initialState : {
        isLoading: false,
        loaded: false,
        hasError: false,
        redditData : {
            'data' : {
                'children' : []
            }
        }
    },
    reducers : {
        clean(state, action){
            state.isLoading = false;
            state.loaded = false;
            state.hasError = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loadPopular.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loadPopular.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loaded = true;
            state.redditData = action.payload;
        })
        .addCase(loadPopular.rejected, (state, action) => {
            state.isLoading = true;
            state.loaded = false;
            state.hasError = true;
        })
    }
})

export const {clean} = popularSlice.actions;
export default popularSlice.reducer;