import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaHeart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/Config';

const Header = () => {
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data.displayName);
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully.");
        } catch (error) {
            toast.error("Failed to log out. Try again.");
            console.log(error);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const smallScreenNavigate = (links) => {
        // Your navigation logic here...
    };

    return (
        <div className='bg-black text-white'>
            <div className='py-3 px-3 max-w-[1490px] mx-auto flex items-center justify-between gap-1 lg:gap-3'>
                <Link to="/"><a className='text-lg font-semibold'>ShoeShack</a></Link>
                <div className='hidden sm:flex gap-9 text-base'>
                    <Link to="/" className='hover:underline'><a>Home</a></Link>
                    <a>All Categories</a>
                    <a>Mens</a>
                    <a>Womens</a>
                    <a>Kids</a>
                    <a>Brands</a>
                </div>
                <div className='w-48 lg:w-80 rounded text-black relative'>
                    <input type="text" placeholder='Search...' className='w-full px-2 py-[2px] rounded outline-none' />
                    <FaSearch className='absolute top-2 right-2' />
                </div>
                <div className='flex items-center gap-3 text-lg'>
                    <div>
                        <FaHeart />
                    </div>
                    <div className='relative'>
                        <FaShoppingCart />
                        <span className='absolute -top-4 -right-3 text-red-500'>0</span>
                    </div>
                    <div onClick={() => setDropDown(!dropDown)} className='flex items-center relative'>
                        {userData && <span className='ml-1 mr-2 font-semibold text-lg'>{userData}</span>}
                        <FaUser className='cursor-pointer' />
                        {dropDown ? <div className='absolute top-7 right-0 z-10'>
                            {userData ? <button onClick={handleLogOut} className='bg-red-600 px-2 rounded'>Logout</button>
                                : <button onClick={handleLogin} className='bg-red-600 px-2 rounded'>Login</button>}
                        </div> : null}
                    </div>
                </div>
                <div onClick={() => setMenu(!menu)} className='sm:hidden text-lg'>
                    <FaBars />
                </div>
                {menu && <div className='absolute top-0 bottom-0 left-0 z-10 w-64 h-screen bg-black'>
                    <div className='flex-col px-3 pt-2 text-lg font-medium'>
                        <Link onClick={() => smallScreenNavigate("home")} className='block pb-1' to="/">Home</Link>
                        <Link onClick={() => smallScreenNavigate("all categories")} className='block pb-1'>All Categories</Link>
                        <Link onClick={() => smallScreenNavigate("mens")} className='block pb-1'>Mens</Link>
                        <Link onClick={() => smallScreenNavigate("womens")} className='block pb-1'>Womens</Link>
                        <Link onClick={() => smallScreenNavigate("brands")} className='block'>Brands</Link>
                    </div>
                    <FaXmark onClick={() => setMenu(false)} className='text-2xl absolute top-3 right-2' />
                </div>}
            </div>
        </div>
    )
}

export default Header;
