// src/pages/PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { removeAll } from '../redux/Slices/CartSlice'; // Assume you have a removeAll action
import { useNavigate } from 'react-router-dom'; // If using react-router-dom for navigation

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/v1/orders";
      const { data } = await axios.post(orderUrl, { amount: totalAmount })
    
      console.log(data);

      const { id: order_id, amount, currency } = data.data;

      const options = {
        key: 'rzp_test_NXwZw43dEd79TM', // Replace with your Razorpay Key ID
        amount,
        currency,
        name: user.name,
       
        description: 'Test Transaction',
        order_id,
        handler: async (response) => {
          // const paymentData = {
          //   razorpay_order_id: response.razorpay_order_id,
          //   razorpay_payment_id: response.razorpay_payment_id,
          //   razorpay_signature: response.Cf9wyPt4CGrj1SAip6pdf6W0,
          // };

         // const verifyUrl = "http://localhost:4000/api/v1/verify";
         // const verifyResponse = await axios.post(verifyUrl, paymentData);

        // if (verifyResponse.data.message === 'Payment Verified Successfully') {
         
        
          dispatch(removeAll()); // Clear the cart
          navigate('/success'); // Redirect to the success page
         // } else {
        //    alert('Payment Verification Failed');
        // }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contactNumber,
        },
        theme: {
          color: '#012652',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment Failed', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <div className="w-full mt-16 lg:w-11/12 lg:fixed lg:right-4 lg:left-14 lg:top-4 bg-white shadow-md rounded-lg p-4">
        <div className="border-b pb-4 mb-4">
          <div className='text-xl font-bold mt-4'>Name : {user.name}</div>
          <div className='text-xl font-bold mt-4'>Email : {user.email}</div>
          <div className='text-xl font-bold mt-4'>Contact : +91 {user.contactNumber}</div>
          <div className="text-lg mt-4 font-semibold">Summary</div>
          <p className="text-green-700 font-semibold">
            <span>Total Items: {cart.length}</span>
          </p>
        </div>

        <div className="flex flex-col items-start">
          <div className="w-full lg:w-2/3">
            {cart.map((item, index) => (
              <p className='text-black' key={index}>
                {item.title.split(" ").slice(0, 5).join(" ")} :
                <span className='text-green-500'> ₹{item.price}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-xl font-bold mb-4 text-green-700 underline p-1">Total Amount: ₹ {totalAmount.toFixed(2)}</p>
        </div>
        <div className='text-black flex items-center justify-center'>
          <button
            onClick={handlePayment}
            className='bg-green-500 w-[150px] p-3 rounded-lg font-bold text-xl text-white'
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
