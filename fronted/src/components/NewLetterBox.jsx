import React from 'react'

const NewLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Handle form submission
    }

  return (
    <div className='text-center'>
        <p className='text-lg font-medium text-gray-800'>Subscribe now for the latest updates& get 25% off</p>
    <p className='text-gray-500 mt-3'>We respect your privacy. Unsubscribe at any time.</p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' />
   <button type='submit' className='bg-green-900 text-white px-4 py-2 rounded mt-3 sm:mt-0 sm:ml-2'>Subscribe</button>
    </form>
    </div>
  )
}

export default NewLetterBox