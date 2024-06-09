import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from 'react-hot-toast';
//import { Link } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, contactNumber } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://shopping-webapp-be.onrender.com/api/v1/signup', formData);
      console.log("SIGNUP API RESPONSE:", response.data);

      const { user } = response.data;
      const { name } = user;

      if (response.data.success) {
        // Handle success response, e.g., navigate to login page
        toast.success(`Successfully Signup ${name}`);
        navigate("/login");
      } else {
        // Handle failure response
        toast.error(response);
      }
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      // Handle error, e.g., display error message
      toast.error(`Signup Failed ${name}`);
    }

    // Reset form data after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleOnSubmit} className="bg-gray-100 border-2 border-slate-900 shadow-lg rounded-lg px-6 py-8 w-full max-w-md mx-4 md:px-10 md:py-8 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Create Account</h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-slate-900 text-lg font-bold mb-2">Full Name:</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter full name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-slate-900 text-lg font-bold mb-2">Email Address:</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-slate-900 text-lg font-bold mb-2">Create Password:</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mb-6">
          <label htmlFor="contactNumber" className="block text-slate-900 text-lg font-bold mb-2">Contact Number:</label>
          <input
            type="number"
            name="contactNumber"
            value={contactNumber}
            onChange={handleOnChange}
            placeholder="Enter contact number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
