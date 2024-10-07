import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        nowTopRatedMovies:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addNowPopularMovies:(state,action)=>{
            state.nowPopularMovies=action.payload;
        },
        addUpcomigMovies:(state,action)=>{
            state.nowUpcomingMovies=action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            state.nowTopRatedMovies=action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload
        },
    }

});

export const {addNowPlayingMovies,addTrailerVideo,addNowPopularMovies,addTopRatedMovies,addUpcomigMovies}=moviesSlice.actions;
export default moviesSlice.reducer;