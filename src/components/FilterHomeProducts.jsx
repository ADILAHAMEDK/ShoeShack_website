import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/ProductsSlice';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Config';
import { addFavorite, fetchFavorites, removeFavorite } from '../redux/UserSlice';

const FilterHomeProducts = () => {
    const [homeFilter, setHomeFilter] = useState([]);
    const [homeFilterBg, setHomeFilterBg] = useState("all");
    const {filterProductsHome,loading} = useSelector((state)=> state.product)
    const {favorite} = useSelector((state)=>state.user)
    console.log(favorite,"nnnnnnnnnnnnnnnn")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            dispatch(fetchFavorites(user.uid));
        } else {
            // If user is not immediately available, wait until it's set up
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    dispatch(fetchFavorites(user.uid));
                }
            });
            return () => unsubscribe(); // Clean up on unmount
        }
    }, [dispatch]);

    useEffect(()=>{
        setHomeFilter(filterProductsHome)
        console.log(filterProductsHome)
    },[filterProductsHome, favorite])

    const handleFilterHomeProducts = (brand)=>{

        if(brand === "all"){
            setHomeFilter(filterProductsHome);
            setHomeFilterBg("all")
            console.log(homeFilterBg)
        }else{
            const filter = filterProductsHome.filter((item)=> item.category === brand)
            setHomeFilter(filter);
            setHomeFilterBg(brand);
        }
    }

    const handleNavigateShopAll = ()=>{
        navigate("/seeAll")
    }

    const handleFavorite = async(itemData) => {
        const user = auth.currentUser
        if(!user){
            toast.error("Please login in to add favorites.");
            return;
        }

        const userId = user.uid

        try {

    // Refere nce to the user document
    const userDocRef = doc(db, "users", userId);
    console.log(userDocRef, "nnnoww")

    // Fetch the current user's favorites
    const userDocSnapshot = await getDoc(userDocRef);
    console.log(userDocSnapshot,"nnnnnnn")
    const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : { favorites: [] };

    // Check if the item is already in favorites
    const favorites = userData.favorites || [];

    if (favorites.some((itemId) => itemId === itemData.id)) {
        // Item is already a favorite; remove it
        const updatedFavorites = favorites.filter((itemId) => itemId !== itemData.id);
        await updateDoc(userDocRef, { favorites: updatedFavorites }); // Update the user document
        dispatch(removeFavorite(itemData));
        toast.info("Removed from Favorites");
    } else {
        // Item is not a favorite; add it
        const updatedFavorites = [ ...favorites, itemData];
        await updateDoc(userDocRef, { favorites: updatedFavorites }); // Update the user document
        dispatch(addFavorite(itemData));
        toast.success("Added to Favorites");
    }
            
        } catch (error) {
            console.log(error)  
        }
    };

  return (
    <div className='px-3 mt-3'>
        <div className='max-w-[1490px] mx-auto'>
            <div className='sm:flex justify-center items-center sm:justify-between'>
                <div className='flex gap-3 sm:gap-5'>
                <button onClick={()=>handleFilterHomeProducts("all")} className={`${homeFilterBg === "all"? "bg-black text-white" : ""} px-3 py-2 border border-black text-black hover:bg-black hover:text-white text-base font-bold`}>All Brands</button>
                <button onClick={()=>handleFilterHomeProducts("puma")} className={`${homeFilterBg === "PUMA" ? "bg-black text-white" : ""} px-3 py-2 border border-black text-black hover:bg-black hover:text-white text-base font-bold`}>Puma</button>
                <button onClick={()=>handleFilterHomeProducts("reebok")} className={`${homeFilterBg === "REEBOK" ? "bg-black text-white" : ""} px-3 py-2 border border-black text-black hover:bg-black hover:text-white text-base font-bold`}>Reebok</button>
                <button onClick={()=>handleFilterHomeProducts("woodLand")} className={`${homeFilterBg === "WOODLAND" ? "bg-black text-white" : ""} px-3 py-2 border border-black text-black hover:bg-black hover:text-white text-base font-bold`}>WoodLand</button>
                </div>
                <h1 onClick={handleNavigateShopAll} className='underline text-base sm:text-lg font-bold cursor-pointer mt-1 sm:mt-0'>SHOP ALL</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-3'>
                {homeFilter && homeFilter.slice(0,5).map((item, index)=>(
                    <div key={index} className='relative hover:border border-black group'>
                        <img src={item.imageUrl} alt="img" className='w-full h-72 transition duration-500 ease-in-out cursor-pointer' />
                        <h1 className='absolute bottom-12 group-hover:bottom-14  ml-1 px-2 bg-white'>${item.price}</h1>
                        <h2 className='mt-2 text-black text-base font-medium pl-2'>{item.name}</h2>
                        <h2 className='mt-[1px] text-gray-600 pl-2'>{item.category}</h2>
                        {<FaHeart onClick={()=>handleFavorite(item)} className={`absolute top-3 right-2 text-lg ${favorite.some((fav)=> fav.id === item.id )  ? "text-red-700" : "text-black"}`} /> }
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FilterHomeProducts