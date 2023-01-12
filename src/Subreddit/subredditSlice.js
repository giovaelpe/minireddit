import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubreddit = createAsyncThunk(
    "subreddit/load",
    async(arg) => {
        const response = await fetch(arg);
        const json = await response.json();
        return json;
    }
);

const subredditSlice = createSlice({
    name: "subreddit",
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
    extraReducers : (builder) => {
        builder.addCase(loadSubreddit.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loadSubreddit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loaded = true;
            state.redditData = action.payload;
        })
        .addCase(loadSubreddit.rejected, (state, action) => {
            state.isLoading = true;
            state.loaded = false;
            state.hasError = true;
        })
    }
})

export default subredditSlice.reducer;