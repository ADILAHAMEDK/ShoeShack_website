import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

 
// export const fetchFavorites = createAsyncThunk("user/fetchFavorites", async (userid, {rejectWithValue}) => {
//     // const user = auth.currentUser;
//     // console.log(user , "uerrrrrr")
//     // if (!user) throw new Error("User not logged in");

//     if (!userid){
//       toast.error("user not logged in");
//       return rejectWithValue("User not logged in");
//     }
//     // const userId = user.uid;
//     // console.log(userId, "uid,,,,,")


//     const userDocRef = doc(db, "users", userid);
//     const userDocSnapshot = await getDoc(userDocRef);
//     console.log(userDocSnapshot,"docccccccc")

//     if (!userDocSnapshot.exists()){
//     console.log("User document does not exist")
//         toast.error("")
//     console.log("User document does not exist")
//     }

//     const userData = userDocSnapshot.data();
//     console.log(userData,"11111kkkk")
//     return userData.favorites || []; // Return favorites or an empty array if none exist
// });


export const fetchFavorites = createAsyncThunk("user/fetchFavorites", async (userid, { rejectWithValue }) => {
    if (!userid) {
        toast.error("User not logged in");
        return rejectWithValue("User not logged in");
    }

    try {
        const userDocRef = doc(db, "users", userid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            toast.error("User document does not exist");
            return rejectWithValue("User document does not exist");
        }

        const userData = userDocSnapshot.data();
        return userData.favorites || []; // Return favorites or an empty array if none exist
    } catch (error) {
        toast.error("Failed to fetch favorites");
        return rejectWithValue(error.message);
    }
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
            console.log(action.payload, "adil")
            if(!state.favorite.some((item)=> item.id === action.payload.id)){
                state.favorite.push(action.payload)
            }
            
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
            state.favorite = action.payload          
            state.loading = false;  
        }),
        builders.addCase(fetchFavorites.rejected, (state) => {
            state.loading = false;
        });

    }
});

export default userSlice.reducer 
export const { getUserName, clearUserName, addFavorite, removeFavorite } = userSlice.actions