import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice(
    {
        name:"user",
        initialState:null,
        reducers:{
            addUser:(state,action)=>{
                return action.payload;
            },
            removeaddUser:(state,action)=>{
                return null;
            },
        },
    }

);

export const {addUser,removeaddUser}=userSlice.actions;
export  default userSlice.reducer;