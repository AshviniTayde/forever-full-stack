import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const[orders, setOrders] = useState([])

  const fetchAllOrders = async (params) => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) { }
  };

  const statusHandler=async (event,orderId) => {
    try {
      const response=await axios.post(backendUrl + "/api/order/status", {orderId,status:event.target.value},  { headers: { token }})
      if (response.data.success) {
        await fetchAllOrders()
      } 
    } catch (error) {
      console.log(error)
        toast.error(response.data.message);

    }
  }
 
  //Aurora@9552


  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order page</h3>
      <div>
        {orders.map((order, index) => (
          
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 my-3 md:my-4 sm:text-sm text-gray-700"
            key={index}
          >
            {/* 1️⃣ Icon */}
            <img className="w-12" src={assets.parcel_icon} />

            {/* 2️⃣ Items */}
            <div>
              {order.items.map((item, itemIndex) => (
                <p className="py-0.5" key={itemIndex}>
                  {item.name} x {item.quantity} <span>({item.size})</span>
                  {itemIndex !== order.items.length - 1 && ","}
                </p>
              ))}
            </div>

            {/* 3️⃣ Address */}
            <div>
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* 4️⃣ Payment + Order Info */}
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ?"Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>
                <strong>
                  {currency}
                  {order.amount}
                </strong>
              </p>
            </div>

            {/* 5️⃣ Status Select */}
            <div>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
