import express from "express"
import { addOrUpdateBudget, deleteBudget, getBudgets } from "../Controllers/Budget.Controller.js";
import isAuthenticated from "../Middleware/IsAuthenticated.js";
const Router=express.Router();

Router.route("/getBudget").get(isAuthenticated,getBudgets)
Router.route("/addBudget").post(isAuthenticated,addOrUpdateBudget)
Router.route("/updateBudget/:id").put(isAuthenticated,addOrUpdateBudget)
Router.route("/deleteBudget/:id").delete(isAuthenticated,deleteBudget)









export default Router   