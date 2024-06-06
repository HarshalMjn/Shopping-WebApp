import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../redux/Slices/UserSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Function to get initials from user's name
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map((word) => word[0]).join('').toUpperCase();
  };

  return (
    <div className='flex justify-center items-center flex-col mt-4 h-screen bg-gray-100 p-4'>
      <h1 className='text-2xl md:text-3xl font-bold mb-4'>Your Account</h1>
      <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-gray-300 flex justify-center items-center text-4xl md:text-6xl font-bold mb-4">
        {getInitials(user.name)}
      </div>
      <h1 className="text-xl md:text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="text-base md:text-lg mb-2">Email: {user.email}</p>
      <p className="text-base md:text-lg mb-4">Contact Number: {user.contactNumber}</p>
      <NavLink 
        to="/login"
        onClick={() => dispatch(setUser(null))}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs text-center mb-2 md:mb-0 md:mr-2"
      >
        Log Out
      </NavLink>
      {/* Uncomment if you have an Orders page */}
      {/* <NavLink 
        to="/orders"  
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs text-center"
      >
        Your Orders
      </NavLink> */}
    </div>
  );
}

export default Dashboard;
