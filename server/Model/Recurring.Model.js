import mongoose from "mongoose";

const recurringExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title for the recurring expense"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transport",
      "Utilities",
      "Entertainment",
      "Shopping",
      "Health",
      "Other",
    ],
    default: "Other",
  },
  frequency: {
    type: String,
    required: true,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  nextDueDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

const RecurringExpense = mongoose.model("RecurringExpense", recurringExpenseSchema);

export default RecurringExpense;
