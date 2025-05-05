import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: { 
        type: String, 
        required: true, 
        trim: true 
    },
    limit: { 
        type: Number, 
        required: true, 
        min: [0, 'Limit must be a positive number'] 
    },
    duration: { 
        type: String, 
        enum: ['daily', 'weekly', 'monthly', 'yearly'], 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    endDate: { 
        type: Date, 
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'End date must be after the start date'
        }
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update `updatedAt` before saving
budgetSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Budget = mongoose.model('Budget', budgetSchema);