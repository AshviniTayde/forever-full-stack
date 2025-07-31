import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const {setShowSearch,getCartCount,navigate,token, setToken,setCartItem} = useContext(ShopContext);

    const logOut=()=>{
    navigate('/login')

   localStorage.removeItem('token')
   setToken('')
   setCartItem('')

    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'><img src={assets.logo} alt="Logo" className='w hidden-36' /></Link>
            <ul className='hidden sm:flex gap-5 text-gray-800'>
                <NavLink to='/' className='flex flex-col items-center gap-1 '>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 '>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>

            </ul>
            < div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="Search" className='w-6 h-6 cursor-pointer' />
                <div className='group relative'>
                    <img onClick ={()=> token ? null : navigate('./login')} src={assets.profile_icon} alt="Cart" className='w-6 h-6 cursor-pointer' />
                                {/* dropdown */}
                    {
                        token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-green-900'> My Profile</p>
                            <p onClick={()=>navigate('./orders')} className='cursor-pointer hover:text-green-900'>Orders</p>
                            <p onClick={logOut} className='cursor-pointer hover:text-green-900'>Logout</p>
                        </div>
                    </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="Cart" className='w-6 h-6 cursor-pointer' />
                    <p className='absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1 rounded'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="Menu" className='w-6 h-6 cursor-pointer sm:hidden' />
            </div>
            {/* Side bar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-800 gap-5' >
                    <div onClick={() => setVisible(false)} className='flex item-center gap- p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border' to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border' to='/collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border' to='/about'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border' to='/contact'>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar