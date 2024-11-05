import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { db, storage } from '../firebase/Config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddProducts = () => {
    const [addProductsInput,setAddProductsInput] = useState({
        name:"",
        price:"",
        image:"",
        category:"",
        gender:"",
        id:'',
    });

    const handleInputChange = (e)=>{
        const { name, value} = e.target
        setAddProductsInput({...addProductsInput, [name]: value})
    }

    const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        setAddProductsInput({...addProductsInput, image:file})
        console.log(addProductsInput.image, "iiiiimmmmg")
    }

    const handleAddProducts = async()=>{
        try {
            if(addProductsInput.image){
                console.log(addProductsInput.image.name)
                const storageRef = ref(storage, `files/${addProductsInput.image.name}`)
                await uploadBytes(storageRef, addProductsInput.image)
            

                const imageUrl = await getDownloadURL(storageRef);
    // Generate a new document reference with an auto-generated ID
    const productRef = doc(collection(db, 'products'));
    
    // Use setDoc to set the document with the custom ID field
    await setDoc(productRef, {
        name: addProductsInput.name,
        price: addProductsInput.price,
        category: addProductsInput.category,
        gender: addProductsInput.gender,
        imageUrl: imageUrl,
        id: productRef.id  // Store the document ID in the 'id' field
    });
                  toast.success("Product added successfully!")
            }
            
        } catch (error) {
            console.log(error)   
        }

    }
  return (
    <div className='max-w-[600px] mx-auto mt-10 border'>
        <h1 className='text-center text-lg font-bold mb-1'>Add Products</h1>
        <div className='px-2 flex mb-3'>
            <label className='text-lg mr-1'>Name:</label>
            <input type="text" name='name' value={addProductsInput.name} onChange={handleInputChange} className='w-full px-2 border border-black focus:outline-none rounded' />
        </div>
        <div className='px-2 flex mb-3'>
            <label className='text-lg mr-1'>Price:</label>
            <input type="text" name='price' value={addProductsInput.price} onChange={handleInputChange} className='w-full px-2 border border-black focus:outline-none rounded' />
        </div>
        <div className='px-2 flex mb-3'>
            <label className='text-lg mr-1'>Category:</label>
            <input type="text" name='category' value={addProductsInput.category} onChange={handleInputChange} className='w-full px-2 border border-black focus:outline-none rounded' />
        </div>
        <div className='px-2 flex mb-3'>
            <label className='text-lg mr-1'>Gender:</label>
            <input type="text" name='gender' value={addProductsInput.gender} onChange={handleInputChange} className='w-full px-2 border border-black focus:outline-none rounded' />
        </div>
        <div className='px-2 flex mb-3'>
            <label className='text-lg mr-1'>Image:</label>
            <input type="file" onChange={handleImageUpload} className='w-full px-2 border border-black focus:outline-none rounded' />
        </div>
        <button onClick={handleAddProducts} className='bg-black text-white px-2 py-1 rounded w-full'>Add</button>
    </div>
  )
}

export default AddProducts