import React, { useEffect } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((item) => (item.category));
        setBestSellers(bestProducts.slice(0, 5));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='text-gray-600 w-3/4 m-auto text-xs sm:text-sm md:text-base'>lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
               {
                bestSellers.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
               }
            </div>
        </div>
    )
}

export default BestSeller