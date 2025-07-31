import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          <div>
           <img src={assets.logo} className='w-32 mb-5' />
           <p className='w-full md:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
           </div>
           <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1'>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
           </div>
           <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1'>
              <li>+1-234-567-890</li>
              <li>info@example.com</li>
            </ul>
           </div>
       </div>
       <hr />
       <p className='text-center text-sm text-bold text-gray-700 py-5'> copyright 2025@ forever.com- all rights reserved</p>
    </div>
  )
}

export default Footer