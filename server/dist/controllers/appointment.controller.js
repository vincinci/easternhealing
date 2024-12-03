"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSlots = exports.updateAppointment = exports.getAppointments = exports.createAppointment = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const User_1 = __importDefault(require("../models/User"));
const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, time, reason } = req.body;
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        // Check if doctor exists
        const doctor = await User_1.default.findOne({ _id: doctorId, role: 'doctor' });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Check if slot is available
        const existingAppointment = await Appointment_1.default.findOne({
            doctor: doctorId,
            date,
            time,
            status: { $ne: 'cancelled' },
        });
        if (existingAppointment) {
            return res.status(400).json({ error: 'Time slot not available' });
        }
        const appointment = new Appointment_1.default({
            patient: req.user._id,
            doctor: doctorId,
            date,
            time,
            reason,
        });
        await appointment.save();
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createAppointment = createAppointment;
const getAppointments = async (req, res) => {
    var _a, _b;
    try {
        const { role } = req.user;
        let appointments;
        if (role === 'patient') {
            appointments = await Appointment_1.default.find({ patient: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                .populate('doctor', 'name')
                .sort({ date: 1, time: 1 });
        }
        else if (role === 'doctor') {
            appointments = await Appointment_1.default.find({ doctor: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id })
                .populate('patient', 'name')
                .sort({ date: 1, time: 1 });
        }
        else {
            appointments = await Appointment_1.default.find({})
                .populate('patient', 'name')
                .populate('doctor', 'name')
                .sort({ date: 1, time: 1 });
        }
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAppointments = getAppointments;
const updateAppointment = async (req, res) => {
    var _a, _b;
    try {
        const { id } = req.params;
        const { status } = req.body;
        const appointment = await Appointment_1.default.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        // Only allow patients to cancel their own appointments
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'patient' && status !== 'cancelled') {
            return res.status(403).json({ error: 'Unauthorized action' });
        }
        // Only allow doctors to confirm/reject their own appointments
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'doctor' &&
            appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized action' });
        }
        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateAppointment = updateAppointment;
const getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;
        // Get all appointments for the specified doctor and date
        const appointments = await Appointment_1.default.find({
            doctor: doctorId,
            date,
            status: { $ne: 'cancelled' },
        });
        // Generate available time slots (9 AM to 5 PM, 30-minute intervals)
        const allSlots = [];
        for (let hour = 9; hour < 17; hour++) {
            allSlots.push(`${hour}:00`);
            allSlots.push(`${hour}:30`);
        }
        // Filter out booked slots
        const bookedSlots = appointments.map((apt) => apt.time);
        const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
        res.json(availableSlots);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAvailableSlots = getAvailableSlots;
