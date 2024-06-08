import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/UserSlice';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shopping-webapp-be.onrender.com/api/v1/login', formData);
      console.log("LOGIN API RESPONSE:", response.data);
      const user = response.data.checkuser;
      console.log(user);
      dispatch(setUser(user));

      if (response.data.success) {
        toast.success("Successfully Login");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("LOGIN API ERROR:", error);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 border-2 border-slate-900 shadow-md rounded-lg px-6 py-8 w-full max-w-md mx-4 md:px-10 md:py-8 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Login</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-slate-900 text-lg font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Email"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-slate-900 text-lg font-bold mb-2">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-10 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full mb-4">
          Login
        </button>
        <Link to="/signup" className="block text-center bg-green-600 hover:bg-green-700 font-light italic text-white rounded-md p-2 w-full">
          New User
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
