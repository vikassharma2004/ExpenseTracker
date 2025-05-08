import express from "express"
import { createIncome, deleteIncome, getIncomes,  getLast30DaysIncome, getMonthlyIncomeTotals, getTotalIncome, updateIncome } from "../Controllers/Income.Controller.js"
import isAuthenticated from "../Middleware/IsAuthenticated.js"
const Router = express.Router()



Router.route("/getIncome").get(isAuthenticated,getIncomes)
Router.route("/getTotalIncome").get(isAuthenticated,getTotalIncome)
Router.route("/addIncome").post(isAuthenticated,createIncome)
Router.route("/updateIncome/:id").put(updateIncome)
Router.route("/deleteIncome/:id").delete(deleteIncome)
Router.route("/monthdata/:id").get(isAuthenticated,getMonthlyIncomeTotals)
Router.route("/getLast30DaysIncome/:id").get(isAuthenticated,getLast30DaysIncome)




export default Router