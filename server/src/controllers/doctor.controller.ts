import { Request, Response } from 'express';
import Doctor, { IDoctor } from '../models/Doctor';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      specialization,
      qualifications,
      experience,
      availableDays,
      availableTimeSlots,
      consultationFee,
      languages,
      about,
    } = req.body;

    // Verify user exists and is a doctor
    const user = await User.findById(userId);
    if (!user || user.role !== 'doctor') {
      return res.status(400).json({ error: 'Invalid user or role' });
    }

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Doctor profile already exists' });
    }

    const doctor = new Doctor({
      userId,
      specialization,
      qualifications,
      experience,
      availableDays,
      availableTimeSlots,
      consultationFee,
      languages,
      about,
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email').sort({ rating: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateDoctor = async (req: AuthRequest, res: Response) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'specialization',
      'qualifications',
      'experience',
      'availableDays',
      'availableTimeSlots',
      'consultationFee',
      'languages',
      'about',
    ];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    updates.forEach((update) => {
      if (req.body[update] !== undefined) {
        (doctor as any)[update] = req.body[update];
      }
    });

    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDoctorsBySpecialization = async (req: Request, res: Response) => {
  try {
    const { specialization } = req.query;
    const doctors = await Doctor.find({ specialization }).populate('userId', 'name email').sort({ rating: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const rateDoctor = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const newRating = (doctor.rating * doctor.totalRatings + rating) / (doctor.totalRatings + 1);
    doctor.rating = Number(newRating.toFixed(1));
    doctor.totalRatings += 1;

    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
