import React, { useState} from "react";
import {  Link } from "react-router-dom";
import image1 from "../../assets/logo.png";
import Applogo from "../../assets/applogo.png";
import Loader from "../../components/Loader/Loader";

import { useUserAuthStore } from "../../store/UserAuthStore.JS";

const Signup = () => {
  const { loading, register } = useUserAuthStore();
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await register(formData);
   
    
    
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    
     
    } catch (err) {
      // error handling is already covered by state
      console.error(err);
    }
  };

 

  return (
    <div className="flex min-h-screen bg-white font-[Inter] relative">
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
          <Loader />
        </div>
      )}

     

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white">
        <div className="mb-8">
          <img src={Applogo} alt="Logo" className="h-30 max-md:h-50 max-md:m-auto" />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get Started!</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl transition shadow-md"
          >
            Get Started
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Login
          </Link>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center p-4">
        <img src={image1} alt="Finance Illustration" className="max-w-md" />
      </div>
    </div>
  );
};

export default Signup;
