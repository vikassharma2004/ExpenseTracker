import express from "express";
import { forgotPassword, getFinancialSummary, GetRecentTransaction, getUserProfile, login, logout, refreshToken, register, resetPassword } from "../Controllers/Auth.Controller.js";
import isAuthenticated from "../Middleware/IsAuthenticated.js";

const Router=express.Router();

Router.route("/login").post(login);
Router.route("/register").post(register);
Router.route("/logout").post(isAuthenticated,logout);
Router.route("/getUserProfile").get(isAuthenticated,getUserProfile);
Router.route("/reset-password/:token").put(resetPassword);
Router.route("/forgot-Password").post(forgotPassword);
Router.route("/refreshtoken").get(isAuthenticated,refreshToken);
Router.route("/transactions/recent").get(isAuthenticated,GetRecentTransaction);
Router.route("/data").get(isAuthenticated,getFinancialSummary);





export default Router