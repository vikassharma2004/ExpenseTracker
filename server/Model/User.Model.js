import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from "bcryptjs"
import { randomBytes, createHash } from "crypto"


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
        trim: true,
    },
    profileimgurl: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, // Prevent password from being returned in queries
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await compare(candidatePassword, this.password);
};



export const User = model('User', UserSchema);
