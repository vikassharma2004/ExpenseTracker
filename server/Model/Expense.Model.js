import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    type: {
      type: String,
      default: "expense",
      enum: ["expense"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    source: {
      type: String,
      required: [true, "Expense source is required"],
      trim: true,
    },
    icon: {
      type: String,
      default: "💸", // fallback icon
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    date: {
      type: Date,
      default: () => new Date(),
      required: true,
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, "Note cannot exceed 500 characters"],
    },
    hideDeleteBtn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", expenseSchema);
