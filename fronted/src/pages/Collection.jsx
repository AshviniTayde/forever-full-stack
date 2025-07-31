import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useEffect } from 'react';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);   //type filter
  const [sortType, setSortType] = useState('relevant'); // sort by


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }


  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }


  const applyFilters = () => {
    let productCopy = products.slice();

    if(showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(productCopy);

  }

  const sortProducts = (criteria) => {
    let fpCopy = filteredProducts.slice();
   switch(sortType){
    case 'low-high':
      setFilteredProducts(fpCopy.sort((a, b) => (a.price - b.price)));
      break;
    case 'high-low':
      setFilteredProducts(fpCopy.sort((a, b) => (b.price - a.price)));
      break;
    default:
      applyFilters();
      break
  }
  }

  useEffect(() => {
    applyFilters();
  }, [category, subCategory,search, showSearch,products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10'>
      {/* Filters section */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=''
            className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`}
          />
        </p>

        <div className={`${showFilters ? '' : 'hidden'} sm:block`}>
          {/* Category Filter */}
          <div className='border border-gray-300 pl-5 py-3 mt-6'>
            <p className='mb-3 text-sm font-medium'>CATEGORY</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Men'} onChange={toggleCategory} /> Men
              </label>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Women'} onChange={toggleCategory} /> Women
              </label>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Kids'} onChange={toggleCategory} /> Kids
              </label>
            </div>
          </div>

          {/* Type Filter */}
          <div className='border border-gray-300 pl-5 py-3 mt-6'>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </label>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className='flex gap-2'>
                <input type='checkbox' className='w-4 h-4' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Products section  or right-side*/}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collection'} />
          {/* product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2 py-1'>
            <option value='relevant'>Sort by:Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        {/* map product */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => (

              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
