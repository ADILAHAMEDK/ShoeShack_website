import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


// export const fetchFavorites = createAsyncThunk("user/fetchFavorites", async () => {
//     const user = auth.currentUser;
//     if (!user) throw new Error("User not logged in");

//     const userId = user.uid;
//     const favCollection = collection(db, "users", userId, "favorites");
//     const favSnapshot = await getDocs(favCollection);

//     const favorites = favSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
//     return favorites;    
// });

export const fetchFavorites = createAsyncThunk("user/fetchFavorites", async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) throw new Error("User document does not exist");

    const userData = userDocSnapshot.data();
    return userData.favorites || []; // Return favorites or an empty array if none exist
});

const userSlice = createSlice({
    name:"user",
    initialState:{
        userName:null,
        favorite:[],
    },
    reducers:{
        getUserName:(state, action)=>{
            state.userName = action.payload
        },
        clearUserName:(state)=>{
            state.userName = null
        },
        addFavorite: (state, action) => {
            console.log(action.payload, "nowww")
            state.favorite.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorite = state.favorite.filter(item => item.id !== action.payload.id);
        },
    },
    extraReducers:(builders)=>{
        builders.addCase(fetchFavorites.pending, (state) => {
            console.log("start");
            state.loading = true;
        }),
        builders.addCase(fetchFavorites.fulfilled, (state, action) => {
            console.log(action.payload,"fcccccc")  
            state.foverite = action.payload          
         
             
            state.loading = false;  
        }),
        builders.addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false;
        });

    }
});

export default userSlice.reducer 
export const { getUserName, clearUserName, addFavorite, removeFavorite } = userSlice.actions