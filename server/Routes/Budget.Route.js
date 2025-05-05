import express from "express"
import { addOrUpdateBudget, deleteBudget, getBudgets } from "../Controllers/Budget.Controller.js";
const Router=express.Router();

Router.route("/getBudget").get(getBudgets)
Router.route("/addBudget").post(addOrUpdateBudget)
Router.route("/updateBudget/:id").put(addOrUpdateBudget)
Router.route("/deleteBudget/:id").delete(deleteBudget)









export default Router   