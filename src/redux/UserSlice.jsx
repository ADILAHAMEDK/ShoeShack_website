import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userName:null,
    },
    reducers:{
        getUserName:(state, action)=>{
            state.userName = action.payload
        },
        clearUserName:(state)=>{
            state.userName = null
        }
    }

});

export default userSlice.reducer 
export const { getUserName, clearUserName } = userSlice.actions