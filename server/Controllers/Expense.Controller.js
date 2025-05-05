import { Budget } from "../Model/Budget.Model.js";
import { Expense } from "../Model/Expense.Model.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      date,
      note,
    });

    // Reduce from budget if applicable
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

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

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
