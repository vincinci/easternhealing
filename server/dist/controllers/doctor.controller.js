"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateDoctor = exports.getDoctorsBySpecialization = exports.updateDoctor = exports.getDoctorById = exports.getAllDoctors = exports.createDoctor = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const User_1 = __importDefault(require("../models/User"));
const createDoctor = async (req, res) => {
    try {
        const { userId, specialization, qualifications, experience, availableDays, availableTimeSlots, consultationFee, languages, about, } = req.body;
        // Verify user exists and is a doctor
        const user = await User_1.default.findById(userId);
        if (!user || user.role !== 'doctor') {
            return res.status(400).json({ error: 'Invalid user or role' });
        }
        // Check if doctor profile already exists
        const existingDoctor = await Doctor_1.default.findOne({ userId });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Doctor profile already exists' });
        }
        const doctor = new Doctor_1.default({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createDoctor = createDoctor;
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor_1.default.find().populate('userId', 'name email').sort({ rating: -1 });
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllDoctors = getAllDoctors;
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor_1.default.findById(req.params.id).populate('userId', 'name email');
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getDoctorById = getDoctorById;
const updateDoctor = async (req, res) => {
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
        const doctor = await Doctor_1.default.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        updates.forEach((update) => {
            if (req.body[update] !== undefined) {
                doctor[update] = req.body[update];
            }
        });
        await doctor.save();
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateDoctor = updateDoctor;
const getDoctorsBySpecialization = async (req, res) => {
    try {
        const { specialization } = req.query;
        const doctors = await Doctor_1.default.find({ specialization }).populate('userId', 'name email').sort({ rating: -1 });
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getDoctorsBySpecialization = getDoctorsBySpecialization;
const rateDoctor = async (req, res) => {
    try {
        const { rating } = req.body;
        const doctor = await Doctor_1.default.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const newRating = (doctor.rating * doctor.totalRatings + rating) / (doctor.totalRatings + 1);
        doctor.rating = Number(newRating.toFixed(1));
        doctor.totalRatings += 1;
        await doctor.save();
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.rateDoctor = rateDoctor;
