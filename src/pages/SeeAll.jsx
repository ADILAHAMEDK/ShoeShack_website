import React, { useEffect, useState } from 'react'
import { bannerSeeAll } from '../assets/assets'
import { FaSlidersH, FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import { MdDisabledByDefault } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, priceFilterSeeAll, genderFilterSeeAll } from '../redux/ProductsSlice';

const SeeAll = () => {
    const [dropDownPrice,setDropDownPrice] = useState(false);
    const [radioPrice, setRadioPrice] = useState("");
    const [dropDownGender, setDropDownGender] = useState(false);
    const [GenderCheckBox1, setGenderCheckBox1] = useState(true);
    const [GenderCheckBox2, setGenderCheckBox2] = useState(true);
    const [GenderCheckBox3, setGenderCheckBox3] = useState(true);
    // const [checkBoxAll, setCheckBoxAll] = useState([]);
    const {priceFilterData} = useSelector((state)=> state.product);
    const [seeAllData, setSeeAllData] = useState(priceFilterData)
    console.log(priceFilterData, "priceFilter........")
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])

    useEffect(()=>{
        setSeeAllData(priceFilterData)
    },[priceFilterData])

    const handleDropDown = (dropdown)=>{
        if(dropdown === "dropDownPrice"){
            setDropDownPrice(!dropDownPrice)
            if(!dropDownPrice){
                setRadioPrice("")
                dispatch(priceFilterSeeAll(""))
            }
            setDropDownGender(false)
        }else if(dropdown === "dropDownGender"){
            setDropDownGender(!dropDownGender)
            setDropDownPrice(false)
        }
    }

    const handleClear = (clear)=>{
        if(clear === "price"){
            setRadioPrice("")
            setDropDownPrice(false)
        }else if(clear === "gender"){
            setDropDownGender(false)
        }   
    }

    const handleCheckBox = (checkBox, gender)=>{
        if(checkBox === "GenderCheckBox1"){
            setGenderCheckBox1(!GenderCheckBox1)
            console.log(GenderCheckBox1, "1")
            if(GenderCheckBox1 === true){
                dispatch(genderFilterSeeAll(gender))
            }else{
                dispatch(genderFilterSeeAll(""))
            }
        }else if(checkBox === "GenderCheckBox2"){
            setGenderCheckBox2(!GenderCheckBox2)
            console.log(GenderCheckBox2, "2")
            if(GenderCheckBox2 === true){
                dispatch(genderFilterSeeAll(gender))
            }else{
                dispatch(genderFilterSeeAll(""))
            }
        }else if(checkBox === "GenderCheckBox3"){
            setGenderCheckBox3(!GenderCheckBox3)
            console.log(GenderCheckBox3, "3")
            if(GenderCheckBox3 === true){
                dispatch(genderFilterSeeAll(gender))
            }else{
                dispatch(genderFilterSeeAll(""))
            }
        }
    }

    const handleRadioPrice = (e)=>{
        const selectedPrice = e.target.value
        setRadioPrice(selectedPrice)
        dispatch(priceFilterSeeAll(selectedPrice));
    }
  return (
    <div className='px-3 mt-2'>
        <div className='max-w-[1490px] mx-auto'>
            <img src={bannerSeeAll} alt="img" className='w-full h-[335px] bg-cover' />
            <div className='mt-3 flex items-center gap-2'>
            <FaSlidersH />
            <div className='border border-gray-400 hover:border-black relative'>
                <button onClick={()=>handleDropDown("dropDownPrice")} className='px-3 py-1 flex items-center gap-2 text-lg'><span className='text-lg font-semibold'>Price</span>{dropDownPrice ? <FaChevronUp /> : <FaChevronDown />}</button>
                {dropDownPrice && <div className='absolute top-10 left-0 z-10 border h-28 w-[150px]'>
                    <FaXmark onClick={()=>setDropDownPrice(false)} className='absolute top-2 right-2'/>
                    <span onClick={()=>handleClear("price")} className='pl-2 pt-1 flex items-center gap-2 font-medium'>clear <MdDisabledByDefault className='pt-1 text-xl ' /></span>   
                    <div className='pl-2 pt-1 flex items-center gap-2'>
                    <input type="radio" value="10" checked={radioPrice === "10"} onChange={handleRadioPrice} className='w-4 h-4 hover:border-black'/>
                    <h2 className='text-lg'>$10</h2>
                    </div>
                    <div className='pl-2 flex items-center gap-2'>
                    <input type="radio" value="20" checked={radioPrice === "20"} onChange={handleRadioPrice} className='w-4 h-4 hover:border-black' />
                    <h2 className='text-lg'>$20</h2>
                    </div>
                    <div className='pl-2 flex items-center gap-2'>
                    <input type="radio" value="25" checked={radioPrice === "25"} onChange={handleRadioPrice} className='w-4 h-4 hover:border-black' />
                    <h2 className='text-lg'>$25</h2>
                    </div>
                </div>}
            </div> 
            <div className='border border-gray-400 hover:border-black relative'>
                <button onClick={()=>handleDropDown("dropDownGender")} className='px-3 py-1 flex items-center gap-2 text-lg'><span className='text-lg font-semibold'>Gender</span>{dropDownGender ? <FaChevronUp /> : <FaChevronDown />}</button>
                {dropDownGender && <div className='absolute top-10 left-0 z-10 border h-28 w-[150px]'>
                    <FaXmark onClick={()=>setDropDownGender(false)} className='absolute top-2 right-2'/>
                    <span onClick={()=>handleClear("gender")} className='pl-2 pt-1 flex items-center gap-2 font-medium'>clear <MdDisabledByDefault className='pt-1 text-xl ' /></span>
                    <div className='pl-2 flex items-center gap-3'>
                        <input type="checkbox" name='checked1' value={GenderCheckBox1} onChange={()=>handleCheckBox("GenderCheckBox1","male")} className='h-4 w-4 ' />
                        <h2 className='text-lg'>Male</h2>
                    </div>
                    <div className='pl-2 flex items-center gap-3'>
                        <input type="checkbox" name='checked2' value={GenderCheckBox2} onChange={()=>handleCheckBox("GenderCheckBox2","female")} className='h-4 w-4 ' />
                        <h2 className='text-lg'>Female</h2>
                    </div> 
                    <div className='pl-2 flex items-center gap-3'>
                        <input type="checkbox" name='checked3' value={GenderCheckBox3} onChange={()=>handleCheckBox("GenderCheckBox3","kids")} className='h-4 w-4 ' />
                        <h2 className='text-lg'>Kids</h2>
                    </div>    
                </div>}
            </div>  
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-3'>
                {seeAllData && seeAllData.length > 0 ? seeAllData.map((item, index)=>(
                    <div key={index} className='relative hover:border border-black group'>
                        <img src={item.imageUrl} alt="img" className='w-full h-72 transition duration-500 ease-in-out cursor-pointer' />
                        <h1 className='absolute bottom-12 group-hover:bottom-14  ml-1 px-2 bg-white'>${item.price}</h1>
                        <h2 className='mt-2 text-black text-base font-medium pl-2'>{item.name}</h2>
                        <h2 className='mt-[1px] text-gray-600 pl-2'>Originals</h2>
                        <FaHeart className='absolute top-3 right-2 text-lg' />
                    </div>
                )) : "no data"}
            </div>
        </div>
    </div>
  )
}

export default SeeAll