import mongoose from "mongoose";

// Define the structure of a user
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,   // Minimum 2 characters
        maxLength: 16,  // Maximum 16 characters
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,   // Minimum 2 characters
        maxLength: 16,  // Maximum 16 characters
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    },

    password: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        min:6,
        max:80
    },

    role: {
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    problemSolved: {
        type: [string]
    },

}, { timestamps: true });

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;