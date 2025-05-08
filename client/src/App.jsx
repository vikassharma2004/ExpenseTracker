import React, { use, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";
import { Toaster } from "react-hot-toast";
import { useUserAuthStore } from "./store/UserAuthStore.js";
import Loader from "./components/Loader/Loader.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

const App = () => {
 
 
  const { getProfile, ischeckingAuth, refreshToken } = useUserAuthStore();
  useEffect(() => {
    getProfile();
  }, []);

  setInterval(() => {
    refreshToken();
  }, 5 * 60 * 1000);

  if (ischeckingAuth) {
    return (
      <div className="fixed inset-0 bg-white/70 bg-opacity-60 flex items-center justify-center z-50">
      <Loader /> {/* Replace this with your actual loader component or spinner */}
    </div>
    );
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/reset-password/:token" exact element={<SignUp />} />
        <Route path="/Dashboard" exact element={<Home />} />
        <Route path="/Incomes" exact element={<Income  />} />
        <Route path="/expenses" exact element={<Expense />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

const Root = () => {
  return <div>Root</div>;
};
