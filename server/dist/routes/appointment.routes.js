"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../controllers/appointment.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.auth, appointment_controller_1.createAppointment);
router.get('/', auth_1.auth, appointment_controller_1.getAppointments);
router.patch('/:id', auth_1.auth, appointment_controller_1.updateAppointment);
router.get('/available-slots', auth_1.auth, appointment_controller_1.getAvailableSlots);
exports.default = router;
