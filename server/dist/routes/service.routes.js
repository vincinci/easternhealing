"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("../controllers/service.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.get('/services', service_controller_1.getAllServices);
router.get('/services/:id', service_controller_1.getServiceById);
router.get('/services/category', service_controller_1.getServicesByCategory);
// Protected routes (admin only)
router.post('/services', auth_1.auth, auth_1.adminAuth, service_controller_1.createService);
router.patch('/services/:id', auth_1.auth, auth_1.adminAuth, service_controller_1.updateService);
router.delete('/services/:id', auth_1.auth, auth_1.adminAuth, service_controller_1.deleteService);
exports.default = router;
