// src/components/Success.js
import React from 'react';
import { Link } from 'react-router-dom';
;



const Success = ({totalAmount}) => {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-8">Thank you for your purchase.</p>
        <p className="text-green-700">
         

        </p>
   
     
        <Link to="/" className="bg-green-500 text-white py-2 px-4 rounded">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
