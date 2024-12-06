import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../redux/ProductsSlice';
import FilterHomeProducts from '../components/FilterHomeProducts';
import { FaHeart } from "react-icons/fa";
import { handleFavorite } from '../functions/AddToFavoriteFunction';

const DetailsPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams();
    console.log(id,"iddd")
    const {products} = useSelector((state)=> state.product)
    const {favorite} = useSelector((state)=>state.user)
    const [details,SetDetails] = useState({});

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch])

    useEffect(()=>{
        const detailsData = products.find((item)=> item.id === id);
        SetDetails(detailsData);
        console.log(details,"dddd");
    },[id,products])
  return (
    <div className='px-3 pt-2'>
        <div className='max-w-[1490px] mx-auto sm:flex gap-3'>
            <div className='border w-full h-[250px] sm:w-[35%] sm:h-[400px]'>
                <img src={details?.imageUrl} alt="img" className='w-full h-full bg-cover' />
            </div>
            <div className='w-full sm:w-[65%] flex flex-col  justify-center'>
                <h1 className='text-2xl sm:text-4xl font-semibold pb-2'>{details?.name}</h1>
                <span className='text-xl sm:text-3xl font-medium text-red-600 pb-2'>${details?.price}</span>
                <span className='text-2xl sm:text-3xl font-semibold pb-2'>Size</span>
                <div className='flex items-center gap-5'>
                    { details?.sizes?.map((item, index)=>(
                        <span className='p-1 sm:p-3 text-white bg-black rounded-sm' key={index}>{item}</span>
                    ))}
                </div>
                <div>
                <button className='mt-5 px-9 sm:px-12 py-3 bg-black text-white font-semibold text-base sm:text-xl'>ADD TO CART</button>
                <div className='relative'>
                    <button onClick={()=>handleFavorite(details, dispatch)} className='mt-5 px-9 sm:px-12 py-3 border-2 border-black text-black font-semibold text-base sm:text-xl'>ADD TO WISHLIST</button>
                    <FaHeart className={`absolute top-9 left-2 text-black text-xl sm:text-2xl ${favorite.some((fav)=> fav.id === details.id ? "text-red-700" : "text-black")}`} />
                </div>
            </div>
            </div>
        </div>
        <h1 className='text-2xl sm:text-3xl font-medium sm:font-bold mt-6 mb-3'>SEE SIMILAR</h1>
        <FilterHomeProducts/>
    </div>
  )
}

export default DetailsPage