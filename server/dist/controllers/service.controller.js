"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesByCategory = exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const createService = async (req, res) => {
    try {
        const service = new Service_1.default(req.body);
        await service.save();
        res.status(201).json(service);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createService = createService;
const getAllServices = async (req, res) => {
    try {
        const services = await Service_1.default.find({ isAvailable: true }).sort({ category: 1, name: 1 });
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllServices = getAllServices;
const getServiceById = async (req, res) => {
    try {
        const service = await Service_1.default.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(service);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getServiceById = getServiceById;
const updateService = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'name',
            'description',
            'category',
            'price',
            'duration',
            'isAvailable',
        ];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates' });
        }
        const service = await Service_1.default.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        updates.forEach((update) => {
            if (req.body[update] !== undefined) {
                service[update] = req.body[update];
            }
        });
        await service.save();
        res.json(service);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    try {
        const service = await Service_1.default.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteService = deleteService;
const getServicesByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const services = await Service_1.default.find({ category, isAvailable: true }).sort({ name: 1 });
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getServicesByCategory = getServicesByCategory;
