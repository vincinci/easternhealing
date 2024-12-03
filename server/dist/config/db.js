"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI, {
            // These options are no longer needed in newer versions of mongoose
            // but adding them for compatibility
            retryWrites: true,
            w: 'majority',
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Add error handler for after initial connection
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        mongoose_1.default.connection.on('connected', () => {
            console.log('MongoDB connected');
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
