import React from 'react'
import bannerTwo from '../assets/images/pumabanner.png'
import { useNavigate } from 'react-router-dom'

const BannerTwo = () => {
    const navigate = useNavigate()

    const handleToMen = ()=>{
        navigate("/men")
    }

    const handleToWomen = ()=>{
        navigate("/women")
    }

    const handleToKids = ()=>{
        navigate("/kids")
    }
  return (
    <div className='px-3'>
        <div className='max-w-[1490px] mx-auto relative'>
        <img src={bannerTwo} alt="img" className='w-full bg-cover'/>
        <button onClick={handleToMen} className='absolute top-[282px] right-[400px] px-[46px] py-2'></button>
        <button onClick={handleToWomen} className='absolute top-[282px] right-[239px] px-[72px] py-5'></button>
        <button onClick={handleToKids} className='absolute top-[282px] right-[100px] px-[62px] py-5'></button>
        </div>   
    </div>
  )
}

export default BannerTwo