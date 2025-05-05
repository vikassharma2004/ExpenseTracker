import { Budget } from "../Model/Budget.Model";
import mongoose from "mongoose";

// Add or Update Budget by Category
export const addOrUpdateBudget = async (req, res) => {
  try {
    const { category, limit, duration } = req.body;

    // Input validation
    if (!category || !limit || !duration) {
      return res.status(400).json({ success: false, message: "Category, limit, and duration are required" });
    }

    let budget = await Budget.findOne({ user: req.user.id, category });

    // If budget exists, update it, otherwise create a new one
    if (budget) {
      budget.limit = limit;
      budget.duration = duration;
    } else {
      // Prevent creating duplicate categories for the user
      if (await Budget.exists({ user: req.user.id, category })) {
        return res.status(400).json({ success: false, message: `Budget for category "${category}" already exists` });
      }

      budget = new Budget({
        user: req.user.id,
        category,
        limit,
        amountSpent: 0,
        duration,
      });
    }

    await budget.save();
    res.status(200).json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Budgets for User
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json({ success: true, budgets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Budget for a Category (Now by Budget ID for Security)
export const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;

    if (!budgetId) {
      return res.status(400).json({ success: false, message: "Please provide the budget ID" });
    }

    // Find the budget by ID and make sure it belongs to the current user
    const deleted = await Budget.findOneAndDelete({
      _id: budgetId,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Budget not found or you are not authorized to delete this" });
    }

    res.status(200).json({ success: true, message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Total Budgets for User (Sum of All Budget Limits)
export const totalBudgets = async (req, res) => {
  try {
    const totalBudgetResult = await Budget.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, totalBudget: { $sum: "$limit" } } }
    ]);

    const totalBudget = totalBudgetResult.length > 0 ? totalBudgetResult[0].totalBudget : 0;

    res.status(200).json({ success: true, totalBudget });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
