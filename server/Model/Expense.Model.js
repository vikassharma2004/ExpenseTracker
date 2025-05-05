import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User reference is required'], 
        index: true 
    },
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        trim: true, 
        minlength: [3, 'Title must be at least 3 characters long'], 
        maxlength: [100, 'Title cannot exceed 100 characters'] 
    },
    amount: { 
        type: Number, 
        required: [true, 'Amount is required'], 
        min: [0, 'Amount must be a positive number'] 
    },
    category: { 
        type: String, 
        required: [true, 'Category is required'], 
        enum: {
            values: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'],
            message: 'Category must be one of the predefined values'
        } 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    note: { 
        type: String, 
        trim: true, 
        maxlength: [500, 'Note cannot exceed 500 characters'] 
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

expenseSchema.index({ user: 1, date: -1 }); // Compound index for efficient querying by user and date

export const Expense = mongoose.model('Expense', expenseSchema);