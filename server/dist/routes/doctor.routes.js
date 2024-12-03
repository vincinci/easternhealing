"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.get('/doctors', doctor_controller_1.getAllDoctors);
router.get('/doctors/:id', doctor_controller_1.getDoctorById);
router.get('/doctors/specialization', doctor_controller_1.getDoctorsBySpecialization);
// Protected routes
router.post('/doctors', auth_1.auth, auth_1.adminAuth, doctor_controller_1.createDoctor);
router.patch('/doctors/:id', auth_1.auth, doctor_controller_1.updateDoctor);
router.post('/doctors/:id/rate', auth_1.auth, doctor_controller_1.rateDoctor);
exports.default = router;
