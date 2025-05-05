import { Budget } from "../Model/Budget.Model";

// Add or Update Budget by Category
export const addOrUpdateBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    let budget = await Budget.findOne({ user: req.user.id, category });

    if (budget) {
      budget.limit = limit;
    } else {
      budget = new Budget({
        user: req.user.id,
        category,
        limit,
        amountSpent: 0,
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

// Delete Budget for a Category
export const deleteBudget = async (req, res) => {
  try {
    const { category } = req.params;

    const deleted = await Budget.findOneAndDelete({
      user: req.user.id,
      category,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Budget not found" });
    }

    res.status(200).json({ success: true, message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
