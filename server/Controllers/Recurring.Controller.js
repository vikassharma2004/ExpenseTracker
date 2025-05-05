import RecurringExpense from "../Model/Recurring.Model";

export const addRecurringExpense = async (req, res) => {
  try {
    const { amount, category, note, recurrence } = req.body;
    const recurring = await RecurringExpense.create({
      user: req.user.id,
      amount,
      category,
      note,
      recurrence,
    });
    res.status(201).json({ success: true, recurring });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecurringExpenses = async (req, res) => {
  try {
    const recurrings = await RecurringExpense.find({ user: req.user.id });
    res.status(200).json({ success: true, recurrings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRecurringExpense = async (req, res) => {
  try {
    await RecurringExpense.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Recurring expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
