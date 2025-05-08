import { User } from "../Model/User.Model.js";
import { resetPasswordTemplate } from "../utils/EmailTemplate/ResetPasswordTemplate.js";
import { Income } from "../Model/Income.Model.js";
import {Expense} from "../Model/Expense.Model.js"
import { Budget } from "../Model/Budget.Model.js";
import {
  generateCookies,
  refreshAccessToken,
} from "../utils/Generatecookie.js";
import generateResetPasswordToken from "../utils/generateResetToken.js";
import { sendEmail } from "../utils/SendEmails.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    // check if account exist in db
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // compare the pasword
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // generate jwt token
    generateCookies(res, user._id);

    return res
      .status(200)
      .json({ success: true, message: "Login Success", user });
  } catch (error) {
    console.log("error while login", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name email and password",
      });
    }
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // create new user
    const user = await User.create({ name, email, password });
    // generate jwt token
    generateCookies(res, user._id);
    let userdoc = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    return res
      .status(200)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (error) {
    console.log("error while register", error);
    res.status(500).json({ success: false, message: "registeration failed" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Logged out successfully", success: true });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

   
    console.log("email", email);
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email" });
    }

    // check if user exists
    const user = await User.findOne({ email });
   
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { resetToken, hashedToken, expires } = generateResetPasswordToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${hashedToken}`;
    let username = user.name;

    const resethtml = resetPasswordTemplate(username, resetLink);

    await sendEmail(email, "Reset Your Password", resethtml)
      .then(() => console.log("Email sent"))
      .catch((err) => console.error("Error sending email", err));
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log("error while forgot password", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  const { token } = req.params;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // token is not expired
    });

    console.log("user", user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Set the new password directly (it will be hashed by the pre-save hook)
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully" }, newPassword);
  } catch (err) {
    console.error("Reset password error:", err.message);
    return res
      .status(500)
      .json({ message: "Server error while resetting password" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ user, message: "User profile fetched successfully" });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    await refreshAccessToken(req, res);
  } catch (error) {
    console.log("error while refresh token", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const GetRecentTransaction=async(req,res)=>{
  try {
    const userId = req.user._id;

    const incomeTransactions = await Income.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: { $toString: "$_id" }, // convert ObjectId to string
          type: { $literal: "income" },
          category: 1,
          source: 1,
          icon: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          amount: 1,
          hideDeleteBtn: 1
        }
      }
    ]);

    const expenseTransactions = await Expense.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: { $toString: "$_id" },
          type: { $literal: "expense" },
          category: 1,
          source: 1,
          icon: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          amount: 1,
          hideDeleteBtn: 1
        }
      }
    ]);
   

    const allTransactions = [...incomeTransactions, ...expenseTransactions];

    // Sort by date descending
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const getFinancialSummary=async(req,res)=>{
  try {
    const userId = req.user._id;
      // Fetch the user's budget data
      let budgetData = await Budget.find({ user: userId });
    if (!budgetData || budgetData.length === 0) {
     budgetData=0
    }


    // Get the total income for the user
    const totalIncomeResult = await Income.aggregate([
      { $match: { user: userId } }, // Match the user's income
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
    ]);

    const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

    // Get the total expense for the user
    const totalExpenseResult = await Expense.aggregate([
      { $match: { user: userId } }, // Match the user's expense
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
    ]);

    const totalExpense = totalExpenseResult.length > 0 ? totalExpenseResult[0].totalExpense : 0;

    // Calculate the remaining budget for each category
    const budgetSummary = budgetData.map(budget => {
      const budgetLimit = budget.limit;
      const spentAmount = budget.spentAmount || 0;
      const remainingBudget = budgetLimit - spentAmount;

      return {
        category: budget.category,
        limit: budgetLimit,
        spentAmount,
        remainingBudget,
        duration: budget.duration,
      };
    });

    // Return the financial summary
    return res.status(200).json({
      totalIncome,
      totalExpense,
      remainingBudget: totalIncome - totalExpense, // Compare income and expenses for overall remaining budget
      budgetSummary, // Summary of remaining budgets for each category
    });

  } catch (error) {
    console.error("Error calculating financial summary:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}