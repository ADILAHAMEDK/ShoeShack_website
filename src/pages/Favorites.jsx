import React, { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../redux/UserSlice'
import { fetchProducts } from '../redux/ProductsSlice'
import { auth } from '../firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'

const Favorites = () =>{
  const favoriteData = useSelector((state)=> state.user.favorite)
  console.log(favoriteData, "mmmmmmm")
  const dispatch = useDispatch();

  useEffect(()=>{
    // const user = auth.currentUser
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        const userId = user.uid
        console.log(userId,"ffuidddd")
        dispatch(fetchProducts());
        dispatch(fetchFavorites(userId))
      }
    })
  
   return ()=> unsubscribe();
  },[dispatch]);

  

  return (
    <div className='px-3 max-w-[1490px] mx-auto'>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-3'>
        {favoriteData.length > 0 ? favoriteData && favoriteData.map((item, index)=>(
          <div key={index} className='relative hover:border border-black group'>
          <img src={item.imageUrl} alt="img" className='w-full h-72 transition duration-500 ease-in-out cursor-pointer' />
          <h1 className='absolute bottom-12 group-hover:bottom-14  ml-1 px-2 bg-white'>${item.price}</h1>
          <h2 className='mt-2 text-black text-base font-medium pl-2'>{item.name}</h2>
          <h2 className='mt-[1px] text-gray-600 pl-2'>{item.category}</h2>
          <FaHeart className={`absolute top-3 right-2 text-lg ${favoriteData.some((fav)=> fav.id === item.id) ? "text-red-700" : "text-black"}`}/>
          </div> )) : <h1 className='text-3xl font-bold text-red-500'>Not Added Products</h1> } 
          </div>
    </div>
  )
}

export default Favorites