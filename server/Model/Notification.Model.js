import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: [true, "Notification message is required"],
  },
  type: {
    type: String,
    enum: ["info", "warning", "expense", "income", "budget", "reminder"],
    default: "info",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String, // optional route to navigate user (e.g., "/dashboard/expenses")
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
