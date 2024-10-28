import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userName:null,
        foverite:[],
    },
    reducers:{
        getUserName:(state, action)=>{
            state.userName = action.payload
        },
        clearUserName:(state)=>{
            state.userName = null
        },
        addFavorite:(state, action)=>{
            const actionFaverite = action.payload
            console.log(actionFaverite, "actiiiiiii")
            const exist = state.filterProductsHome.find((...item)=>{
                console.log(item, "current item");
                return item.id === actionFaverite.id
            })
            console.log(exist,"fff")
            
            // if(!exist){ 
            //     const addFaverite = state.filterProductsHome.find((item.name === actionFaverite.name))
            //     state.favorite.push(addFaverite)
            //     console.log(state.favorite, "faveriiiiii")   
            // }else{
            //     state.favorite.push(exist)
            // } 
        }
    }

});

export default userSlice.reducer 
export const { getUserName, clearUserName, addFavorite } = userSlice.actions