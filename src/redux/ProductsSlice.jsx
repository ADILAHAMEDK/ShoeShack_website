import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Config';
import { toast } from "react-toastify";

// Thunk to fetch products from Firestore
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const dataCollection = collection(db, 'products');
        const datas = await getDocs(dataCollection);
        const filterData = datas.docs.map((item) => ({ ...item.data(), id: item.id }));
        return filterData;
        
    } catch (error) {
        toast.error(error)
        console.log(error)   
    }
});

export const fecthSearchedName = createAsyncThunk("products/fetchSearchedName", async()=>{
    try {
        const dataSearchedName = collection(db,"searchedName");
        const data = await getDocs(dataSearchedName);
        const getData = data.docs.map((item)=>({...item.data(), id: item.id}));
        return getData[0]?.searchedName
        
    } catch (error) {
        console.log(error)
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        search:[],
        searchedName:"",
        filterProductsHome:[],
        loading: false,
        priceFilterData:[],
    },
    reducers: {
        searchFunction:(state, action)=>{
            console.log(action.payload,"search payload")
            state.searchedName = action.payload
            state.search = state.filterProductsHome.filter((item)=>{
                return item.name.toLowerCase().includes(action.payload.toLowerCase())
             })
             console.log(state.search,"search result")
        },
        priceFilterSeeAll:(state, action)=> {
            if(action.payload){
                state.priceFilterData = state.filterProductsHome.filter((item)=>{
                    return Number(item.price) === Number(action.payload)
                }) 
            }else{
                state.priceFilterData = state.filterProductsHome
            }
            
            console.log(state.priceFilterData ,".....hhh")
        },
        genderFilterSeeAll:(state, action)=>{
            if(action.payload){
                state.priceFilterData = state.filterProductsHome.filter((item) => {
                    return item.gender === action.payload
                });
            }else{
                state.priceFilterData = state.filterProductsHome
            }   
        },
    },
    extraReducers: (builders) => {
        builders.addCase(fetchProducts.pending, (state, action) => {
            console.log("start");
            state.loading = true;
        }),
        builders.addCase(fetchProducts.fulfilled, (state, action) => {            
            state.filterProductsHome = action.payload; 
            console.log(state.filterProductsHome, "jjjjjjjjj")  
            state.priceFilterData = action.payload;
            console.log(state.priceFilterData,"ppppppppppp")   
             
            state.loading = false;  
        }),
        builders.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Failed to fetch products", action.error);
            state.loading = false;
        });
        
        //searchName thunk 
        builders.addCase(fecthSearchedName.pending, (state) => {
            console.log("start");
            state.loading = true;
        }),
        builders.addCase(fecthSearchedName.fulfilled, (state, action) => {   
          console.log(action.payload, "fire")         
          state.searchedName = action.payload
          state.loading = false;  
        }),
        builders.addCase(fecthSearchedName.rejected, (state, action) => {
            console.log("Failed to searchName", action.error);
            state.loading = false;
        });
    }
});

export default productsSlice.reducer;
export const {searchFunction, priceFilterSeeAll, genderFilterSeeAll} = productsSlice.actions;
