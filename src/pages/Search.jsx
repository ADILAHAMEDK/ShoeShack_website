import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fecthSearchedName } from '../redux/ProductsSlice'
import { FaHeart } from 'react-icons/fa'

const Search = () => {
    const {searchedName, search} = useSelector((state)=> state.product)
    console.log(searchedName, "searchedName")
    const dispatch = useDispatch() 

    useEffect(()=>{
        dispatch(fecthSearchedName());
    },[dispatch])

  return (
    <div className='py-2 px-3'>
        <div className='max-w-[1490px]'>
            <h4 className='text-xl'>Your Search results for:<span className='text-3xl font-bold text-red-400'>{searchedName}</span> <span className='text-sm'>{`[${search.length}]`}</span></h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-3'>
                {search.length > 0 ? search && search.map((item, index)=>(
                    <div key={index} className='relative hover:border border-black group'>
                        <img src={item.imageUrl} alt="img" className='w-full h-72 transition duration-500 ease-in-out cursor-pointer' />
                        <h1 className='absolute bottom-12 group-hover:bottom-14  ml-1 px-2 bg-white'>${item.price}</h1>
                        <h2 className='mt-2 text-black text-base font-medium pl-2'>{item.name}</h2>
                        <h2 className='mt-[1px] text-gray-600 pl-2'>Originals</h2>
                        <FaHeart onClick={()=>handleFavorite(item)} className='absolute top-3 right-2 text-lg' />
                    </div>
                )):<h1 className='font-bold text-2xl'>not have product</h1>}
            </div>
        </div>
    </div>
  )
}

export default Search