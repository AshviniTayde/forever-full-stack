import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'

// gobal variables
const currency = 'inr'
const deliverCharge = 10

// gayway initialzed
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
  key_id: process.env.RAZOROAY_KEY_ID,
  key_secret: process.env.RAZOROAY_KEY_SECRET
})

// placing orders using cash on delivery method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()

    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })
    res.json({ success: true, message: 'Order Placed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()

    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Deliver Charges'
        },
        unit_amount: deliverCharge * 100
      },
      quantity: 1
    })
    const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
     cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  
      line_items,
      mode: 'payment',
      locale: 'en',
    })
    res.json({ success: true, session_url: session.url })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// verify stripe

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true })

    } else {
      await orderModel.findOneAndDelete(orderId)
      res.json({ success: false })

    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()

    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error)
        return res.json({ success: false, message: error })

      }
      res.json({ success: true, order })
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// verify razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    console.log(orderInfo)
    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true, message: "payment Successful" })
    } else {
      res.json({ success: false, message: 'Payment Failed' })
    }


  } catch (error) {
   console.log(error)
    res.json({ success: false, message: error.message })


  }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })


  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// user Orders data for fronted
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// update Orders status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status updated' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };