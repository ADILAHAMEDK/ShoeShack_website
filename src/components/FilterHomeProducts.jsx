import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, fetchProducts } from '../redux/ProductsSlice';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FilterHomeProducts = () => {
    const [homeFilter, setHomeFilter] = useState([]);
    const [homeFilterBg, setHomeFilterBg] = useState("all");
    const {filterProductsHome,loading} = useSelector((state)=> state.product)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])

    useEffect(()=>{
        setHomeFilter(filterProductsHome)
        console.log(filterProductsHome)
    },[filterProductsHome])

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

    const handleFavorite =(itemData)=>{
        dispatch(addFavorite(itemData))
    }

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
                        <h2 className='mt-[1px] text-gray-600 pl-2'>Originals</h2>
                        <FaHeart onClick={()=>handleFavorite(item)} className='absolute top-3 right-2 text-lg' />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FilterHomeProducts