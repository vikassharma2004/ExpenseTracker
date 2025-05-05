import express from "express"
import { createIncome, deleteIncome, getIncomes, getTotalIncome, updateIncome } from "../Controllers/Income.Controller.js"
import isAuthenticated from "../Middleware/IsAuthenticated.js"
const Router = express.Router()



Router.route("/getIncome").get(isAuthenticated,getIncomes)
Router.route("/getTotalIncome").get(isAuthenticated,getTotalIncome)
Router.route("/addIncome").post(isAuthenticated,createIncome)
Router.route("/updateIncome/:id").put(updateIncome)
Router.route("/deleteIncome/:id").delete(deleteIncome)




export default Router