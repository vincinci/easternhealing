import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string;
  qualifications: string[];
  experience: number;
  availableDays: string[];
  availableTimeSlots: string[];
  consultationFee: number;
  rating: number;
  totalRatings: number;
  languages: string[];
  about: string;
}

const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  qualifications: [{
    type: String,
    required: true,
  }],
  experience: {
    type: Number,
    required: true,
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  }],
  availableTimeSlots: [{
    type: String,
    required: true,
  }],
  consultationFee: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  languages: [{
    type: String,
    required: true,
  }],
  about: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
