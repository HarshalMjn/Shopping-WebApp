import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";



const Cart = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);
  console.log("user is",user);
  console.log("Printing Cart");
  console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className=" p-4 flex flex-col lg:flex-row lg:space-x-4">
      {cart.length > 0 ? (
        <>
          <div className="w-full lg:w-2/3">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>
          
        
          <div className="w-full mt-16 lg:w-1/3 lg:fixed lg:right-4 lg:top-4 bg-white shadow-md rounded-lg p-4">
            <div className="border-b pb-4 mb-4">
              <div className="text-xl font-bold mb-2">Your Cart</div>
              <div className="text-lg mb-4">Summary</div>
              <p className="text-green-700">
                <span>Total Items: {cart.length}</span>
              </p>
            </div>

            <div className="flex flex-col items-end">
              
            <div className="flex flex-col items-end">
              <p className="text-xl font-bold mb-4">Total Amount:  ₹ {totalAmount.toFixed(2)}</p>
              {
                !user  ? (
                  <p className="text-red-500">Please Login For Checkout..</p>
                ) : (
                  <NavLink to="/cart/payment" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
                    CheckOut Now 
                    
                  </NavLink>
                )
              }
            </div>
              
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4">Cart Empty</h1>
          <Link to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
