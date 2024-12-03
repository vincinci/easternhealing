import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory,
} from '../controllers/service.controller';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/services', getAllServices);
router.get('/services/:id', getServiceById);
router.get('/services/category', getServicesByCategory);

// Protected routes (admin only)
router.post('/services', auth, adminAuth, createService);
router.patch('/services/:id', auth, adminAuth, updateService);
router.delete('/services/:id', auth, adminAuth, deleteService);

export default router;
