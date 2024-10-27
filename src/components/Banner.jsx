import React, { useEffect, useState } from 'react'
import { bannerSlides } from '../assets/assets'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const previousSlide = ()=>{
        setCurrentIndex(prev => prev === 0 ? bannerSlides.length - 1 : prev - 1);
    }

    const nextSlide = ()=> {
        setCurrentIndex(prev => prev === bannerSlides.length - 1 ? 0 : prev + 1);
      };

      useEffect(()=>{
        const interval = setInterval(()=>{
            nextSlide();     
        }, 3000)
        return ()=> clearInterval(interval)
      },[currentIndex])
  return (
    <div className='py-2 px-3'>
        <div className='max-w-[1490px] h-96 mx-auto overflow-hidden relative group rounded'>
            <img src={bannerSlides[currentIndex]} alt="img" className='w-full h-full bg-center
             bg-cover transition ease-in-out duration-500 ' />
            <div className='absolute top-0 w-full h-full flex items-center justify-between px-8'>
                <button onClick={previousSlide} className='hidden group-hover:block text-2xl text-white p-2 bg-black/20 rounded-full cursor-pointer'><BsChevronCompactLeft size={30} /></button>
                <button onClick={nextSlide} className='hidden group-hover:block text-2xl text-white p-2 bg-black/20 rounded-full cursor-pointer'><BsChevronCompactRight size={30} /></button>
            </div>
            <div className='absolute bottom-0 w-full flex items-center justify-center py-2 cursor-pointer'>
                {bannerSlides.map((_, index)=>(
                    <RxDotFilled key={index} onClick={()=>setCurrentIndex(index)} className={`${index === currentIndex ? "text-white" : "text-gray-600"}`} />
                ))}
            </div>

        </div>
    </div>
  )
}

export default Banner