import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  getAvailableSlots,
} from '../controllers/appointment.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);
router.patch('/:id', auth, updateAppointment);
router.get('/available-slots', auth, getAvailableSlots);

export default router;
