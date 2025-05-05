import cron from "node-cron";
import { createNotification } from "../Controllers/Notification.Controller.js";
import Expense from "../Model/Expense.Model.js"
import Budget from "../Model/Budget.Model.js"
import RecurringExpense from "../Model/Recurring.Model.js"
import User from "../Model/User.Model.js"

// Automate budget notifications when spending exceeds the budget
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find(); // Get all users, or filter based on your needs
    for (const user of users) {
      const budgets = await Budget.find({ user: user._id });

      for (const budget of budgets) {
        const totalExpenses = await Expense.aggregate([
          { $match: { user: user._id, category: budget.category } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        if (totalExpenses[0].total > budget.limit) {
          // Send Notification: Budget limit exceeded
          createNotification({
            userId: user._id,
            message: `You have exceeded your budget limit for ${budget.category}.`,
            type: 'warning',
            link: '/budget',
          });
        }
      }
    }
  } catch (error) {
    console.error("Error sending automated notifications:", error);
  }
});

// Automate recurring expense reminders
cron.schedule('0 9 * * *', async () => {
  try {
    const recurringExpenses = await RecurringExpense.find();
    
    for (const recurring of recurringExpenses) {
      createNotification({
        userId: recurring.user,
        message: `Your recurring expense for ${recurring.category} is due tomorrow.`,
        type: 'info',
        link: '/expenses',
      });
    }
  } catch (error) {
    console.error("Error sending recurring expense notifications:", error);
  }
});

