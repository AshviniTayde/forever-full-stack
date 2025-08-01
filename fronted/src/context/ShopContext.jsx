import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";    //insteat f this we get product from the api
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext(); // Create a context api for the shop

const ShopContextProvider = (props) => {
  const currency = "₹ ";
  const backendUrl=import.meta.env.VITE_BACKEND_URL
// console.log("✅ backendUrl is:", backendUrl);

  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');



  const navigate=useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl +'/api/cart/add',{itemId,size},{headers:{token}})
      } catch (error) {
          console.log(error);
          toast.error(error.message)
      }
      
    } else {
      
    }
  }

  // useEffect(()=>{
  //     console.log(cartItems)
  // },[cartItems])
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // const updateQuantity = async (itemId, size, quantity) => {
  //   let cartData = structuredClone(cartItems);
  //   cartData[itemId][size] = quantity;
    
  //   setCartItems(cartData);
  // };
  const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);

  if (quantity === 0) {
    delete cartData[itemId][size];
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }

  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(backendUrl + '/api/cart/update', {
        itemId,
        size,
        quantity,
        userId: "", // You don't need to send this if you use auth middleware
      }, { headers: { token } });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
};



  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };


const getProductData=async () => {
  try {
       const response= await axios.get(backendUrl + '/api/product/list')
       if(response.data.success){
        setProducts(response.data.products)
       }
       else{
        toast.error(response.data.message)
       }
  } catch (error) {
        console.log(error)
        toast.error(error.message)
  }
}

const getUserCart=async (token) => {
  try {
        const response =await axios.post(backendUrl+ '/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
          setCartItems(response.data.cartData)
          
        } 
  } catch (error) {
     console.log(error);
     toast.error(error.message)
  }
}

useEffect(()=>{
  getProductData()
},[])

useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'))
  }
},[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart, setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,navigate,backendUrl,setToken,token
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider; // Export the context provider
