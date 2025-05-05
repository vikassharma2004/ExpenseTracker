import express from "express"
import { addExpense, deleteExpense, getExpenses, getTotalExpense } from "../Controllers/Expense.Controller.js"
import isAuthenticated from "../Middleware/IsAuthenticated.js"
const Router=express.Router()


Router.route("/getExpenses").get(isAuthenticated,getExpenses)
Router.route("/addExpense").post(isAuthenticated,addExpense)
Router.route("/gettotalExpense").get(isAuthenticated,getTotalExpense)
Router.route("/deleteExpense/:id").delete(deleteExpense)




export default Router