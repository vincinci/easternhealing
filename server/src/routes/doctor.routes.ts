import express from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  getDoctorsBySpecialization,
  rateDoctor,
} from '../controllers/doctor.controller';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/doctors', getAllDoctors);
router.get('/doctors/:id', getDoctorById);
router.get('/doctors/specialization', getDoctorsBySpecialization);

// Protected routes
router.post('/doctors', auth, adminAuth, createDoctor);
router.patch('/doctors/:id', auth, updateDoctor);
router.post('/doctors/:id/rate', auth, rateDoctor);

export default router;
