import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        posts: [],
        postExtras : [],
        subs : []
    },
    reducers : {
        addPost(state, action){
            state.posts.push(action.payload.post);
            state.postExtras.push(action.payload.extras);
        },
        removePost(state, action){
            state.posts = state.posts.filter(item => item !== action.payload.post);
            state.postExtras = state.postExtras.filter(item => item !== action.payload.extras);
        },
        addSub(state, action){
            state.subs.push(action.payload);
        },
        removeSub(state, action){
            state.subs = state.subs.filter(item => item !== action.payload);
        }
    }
})

export const {addPost, removePost, removeSub, addSub} = favoritesSlice.actions;
export default favoritesSlice.reducer;