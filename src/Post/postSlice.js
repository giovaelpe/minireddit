import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPost = createAsyncThunk(
    "post/load",
    async(arg) => {
        const response = await fetch(arg, {cache: "no-cache"});
        const json = await response.json();
        return json;
    }
);

const postSlice = createSlice({
    name: "post",
    initialState : {
        loaded : false,
        isLoading: false,
        hasError: false,
        postData : [
            {
                'data' : {
                    'children' : [
                        {
                            'data' : {}
                        }
                    ]
                }
            },
            {
                'data' : {
                    'children' : [
                        {
                            'data' : {}
                        }
                    ]
                }
            }
        ]
    },
    reducers : {
        quitPost(state, action){
            state.loaded = false;
            state.hasError = false;
            state.isLoading = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loadPost.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loadPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loaded = true;
            state.postData = action.payload;
        })
        .addCase(loadPost.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.loaded = false;
        })
    }
});

export const {quitPost} = postSlice.actions;
export default postSlice.reducer;