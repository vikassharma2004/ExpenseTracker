import React, {  useState } from "react";

import Applogo from "../../assets/applogo.png";
import Loader from "../../components/Loader/Loader";
import { useUserAuthStore } from "../../store/UserAuthStore";
import { useNavigate } from "react-router-dom";


import { RiLoader2Line } from "react-icons/ri";

const Login = () => {
  const { login, loading} = useUserAuthStore();


console.log(loading)

 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Navigate=useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();


  const res=await login(formData)
    
  console.log(res.
    success);
  
    if(res.success){
      Navigate("/dashboard")
    }
    

    
      setFormData({
        email: "",
        password: "",
      });
     
    
  };
 



  return (
    <div className="relative flex min-h-screen ">
    
      

      <div className="hidden md:flex w-1/2 items-center justify-center p-4">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-illustration-download-in-svg-png-gif-file-formats--business-finance-strategy-concept-pack-illustrations-3561009.png"
          alt="Finance Illustration"
          className="max-w-full object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white ">
        <div className="mb-8 mx-auto">
          <img src={Applogo} alt="Logo" className="h-30 max-md:h-50 max-md:m-auto" />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 mx-auto">Welcome Back!</h2>

        <form className="space-y-6 w-[60%] mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#27374D] hover:bg-[#27374dec] text-white py-2 rounded-xl transition shadow-md cursor-pointer"
          >
           {loading?<RiLoader2Line className="animate-spin  text-3xl mx-auto" />: "login"} 
          </button>
          <div className="text-right">
            <a href="/forgotpassword" className="text-sm text-[#27374D] hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="mt-8 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#27374D] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
