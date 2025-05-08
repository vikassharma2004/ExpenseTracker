import { Budget } from "../Model/Budget.Model.js";
import { Expense } from "../Model/Expense.Model.js";

// Create Expense
export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, note, source, icon, hideDeleteBtn } = req.body;
    console.log(req.body);

    // Ensure all required fields are provided
    if (!amount || !category || !date || !source) {
      return res.status(400).json({
        success: false,
        message: "Please provide amount, category, date, source",
      });
    }

    // Create a new expense record
    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      source,
      icon: icon || "💸",  // Fallback icon if not provided
      date,
      note,
      hideDeleteBtn: hideDeleteBtn || false,
      type: "expense",  // Default type as expense
    });

    // Update budget if a budget record exists for this user and category
    const budget = await Budget.findOne({ user: req.user.id, category });
    if (budget) {
      budget.amountSpent += amount;
      await budget.save();
    }

    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
  try {
    const userId=req.user.id;
    console.log("ex",userId)
    const expenses = await Expense.find({ userId });
    console.log(expenses);
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Update budget when an expense is deleted
    const budget = await Budget.findOne({ user: req.user.id, category: expense.category });
    if (budget) {
      budget.amountSpent -= expense.amount;
      await budget.save();
    }

    await expense.deleteOne();
    res.status(200).json({ success: true, message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Total Expense
export const getTotalExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.status(200).json({ success: true, totalExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
