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

const productsSlice = createSlice({
    name: "products",
    initialState: {
        filterProductsHome:[],
        loading: false,
        priceFilterData:[],
        favorite:[],
    },
    reducers: {
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
        addFavorite:(state, action)=>{
            const actionFaverite = action.payload
            const exist = state.filterProductsHome.find((item)=> item.name === actionFaverite.name)
            console.log( exist,"fff")
            if(!exist){ 
                const addFaverite = state.filterProductsHome.find((item.name === actionFaverite.name))
                state.favorite.push(addFaverite)
                console.log(state.favorite, "faveriiiiii")   
            }else{
                state.favorite.push(exist)
            } 
        }
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
    }
});

export default productsSlice.reducer;
export const { priceFilterSeeAll, addFavorite } = productsSlice.actions;
