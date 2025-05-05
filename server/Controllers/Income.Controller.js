import { Income } from "../Model/Income.Model.js";
import mongoose from "mongoose";
export const createIncome = async (req, res) => {
  try {
    const { source, amount, note, date } = req.body || {};



    if(!source || !amount || !date) {
      return res.status(400).json({ success: false, message: "Please provide source and amount and date" });
    }

    const income = await Income.create({
      user: req.user.id,
      source,
      amount,
      note,
      date,
    });

    res.status(201).json({ success: true, income });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, incomes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Income.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({ success: true, message: "Income deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateIncome = async (req, res) => {
  try {
    const { source, amount, date, note } = req.body;

    // Check if income record exists for the logged-in user
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "Income record not found" });
    }

    // Update the income record with the provided data
    income.source = source || income.source;
    income.amount = amount || income.amount;
    income.date = date || income.date;
    income.note = note || income.note;

    // Save the updated income record
    await income.save();

    // Respond with the updated income record
    res.status(200).json({ success: true, income });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/incomeController.js
export const getTotalIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Income.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = result[0]?.total || 0;

    res.status(200).json({ success: true, totalIncome });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
