import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
     
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')

    const onSubmitHandler=async (e) => {
            try {
                   e.preventDefault();
                   const respones = await axios.post(backendUrl + '/api/user/admin' ,{email,password})
                      if(respones.data.success){
                             setToken(respones.data.token)
                      }
                      else{
                        toast.error(respones.data.message)
                      }
                  } catch (error) {
                      console.log(error)
                        toast.error(error.message)

            }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-2xl rounded-lg px-8 py-6 max-w-md'>
        <h1 className=' text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='your@email.com' required/>
          </div>
           <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='paasword' placeholder='enter your password' required/>
          </div>
          <button className='mt-2 w-full py-2 px-44 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login