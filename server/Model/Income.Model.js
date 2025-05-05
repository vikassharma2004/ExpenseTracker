import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: [true, 'User reference is required'] 
        },
        source: { 
            type: String, 
            required: [true, 'Income source is required'], 
            trim: true 
        },
        amount: { 
            type: Number, 
            required: [true, 'Income amount is required'], 
            min: [0, 'Amount must be a positive number'] 
        },
        date: { 
            type: Date, 
            default: () => new Date(), 
            required: true 
        },
        note: { 
            type: String, 
            trim: true, 
            maxlength: [500, 'Note cannot exceed 500 characters'] 
        },
    },
    { 
        timestamps: true 
    }
);

export const Income = mongoose.model('Income', incomeSchema);