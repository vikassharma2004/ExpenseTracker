import { Income } from "../Model/Income.Model.js";
import mongoose from "mongoose";

// Create Income
export const createIncome = async (req, res) => {
  try {
    const { source, amount, note, date, mode, icon, hideDeleteBtn, category } =
      req.body;

    if (!source || !amount || !date || !mode || !category) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Source, amount, date, and mode are required.",
        });
    }

    const income = await Income.create({
      user: req.user.id,
      source,
      amount,
      note,
      date,
      category,
      mode,
      icon: icon || "💰", // default icon
      hideDeleteBtn: hideDeleteBtn || false,
      type: "income",
    });

    res.status(201).json({ success: true, income });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Incomes
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, incomes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Income
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

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const { source, amount, date, note, mode, icon, hideDeleteBtn } = req.body;

    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    income.source = source || income.source;
    income.amount = amount || income.amount;
    income.date = date || income.date;
    income.note = note || income.note;
    income.mode = mode || income.mode;
    income.icon = icon || income.icon;
    income.hideDeleteBtn =
      hideDeleteBtn !== undefined ? hideDeleteBtn : income.hideDeleteBtn;

    await income.save();

    res.status(200).json({ success: true, income });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Total Income
export const getTotalIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Income.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = result[0]?.total || 0;

    res.status(200).json({ success: true, totalIncome });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMonthlyIncomeTotals = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            category: "$category",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: {
            month: "$_id.month",
            year: "$_id.year",
          },
          incomes: {
            $push: {
              category: "$_id.category",
              amount: "$totalAmount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $let: {
              vars: {
                months: [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
              in: { $arrayElemAt: ["$$months", "$_id.month"] },
            },
          },
          year: "$_id.year",
          incomes: 1,
        },
      },
      { $sort: { year: 1, month: 1 } },
    ]);

    console.log(result);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Aggregation error:", error);
    throw error;
  }
};


export const getLast30DaysIncome = async (req,res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const result = await Income.aggregate([
      {
        // Match documents for the specific user and from the last 30 days
        $match: {
          user: mongoose.Types.ObjectId(userId), // Filter by user ID
          date: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 days ago
          },
        },
      },
      {
        // Group by date and category, summing the amounts
        $group: {
          _id: { date: "$date", category: "$category" }, // Group by date and category
          totalAmount: { $sum: "$amount" }, // Sum the amounts for each category and date
        },
      },
      {
        // Add the day field for each date
        $addFields: {
          dayOfWeek: { $dayOfWeek: "$_id.date" }, // Get the day of the week (1 = Sunday, 7 = Saturday)
          date: { $dateToString: { format: "%Y-%m-%d", date: "$_id.date" } }, // Format date to "YYYY-MM-DD"
          category: "$_id.category", // Include category
        },
      },
      {
        // Add the day name manually based on the day of the week
        $addFields: {
          day: {
            $switch: {
              branches: [
                { case: { $eq: ["$dayOfWeek", 1] }, then: "Sun" },
                { case: { $eq: ["$dayOfWeek", 2] }, then: "Mon" },
                { case: { $eq: ["$dayOfWeek", 3] }, then: "Tue" },
                { case: { $eq: ["$dayOfWeek", 4] }, then: "Wed" },
                { case: { $eq: ["$dayOfWeek", 5] }, then: "Thu" },
                { case: { $eq: ["$dayOfWeek", 6] }, then: "Fri" },
                { case: { $eq: ["$dayOfWeek", 7] }, then: "Sat" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        // Project the final format
        $project: {
          _id: 0, // Remove the _id field
          date: 1,
          day: 1,
          amount: "$totalAmount", // Rename totalAmount to amount
          category: 1,
        },
      },
      {
        // Optionally, sort by date
        $sort: {
          date: 1, // Sort ascending by date
        },
      },
    ]);
console.log(result,"income30days");
    return res.status(200).json({ success: true, result }); // Return in the desired format
  } catch (error) {
    console.error("Error fetching last 30 days income:", error);
    throw error;
  }
};

