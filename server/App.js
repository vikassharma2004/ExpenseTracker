import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDb from "./config/db/ConnectDb.js";
import AuthRoutes from "./Routes/Auth.Routes.js";

import IncomeRoutes from "./Routes/Income.Routes.js"

dotenv.config();
const app = express();

//  Middleware for parsing cookies and request bodies
app.use(cookieParser()); // First, parse cookies
app.use(express.json());  // Then parse JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data

//  Route Handling
app.use("/api/auth", AuthRoutes);
app.use("/api/income",IncomeRoutes)

//  Server Setup
const server = app.listen(process.env.PORT, () => {
    ConnectDb(); // Database connection
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Default route (optional)
app.get("/", (req, res) => {
    res.send("Hello World");
});

//  Global Error Handlers for uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
   
    
});
