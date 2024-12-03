import { Request, Response } from 'express';
import Service, { IService } from '../models/Service';

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateService = async (req: AuthRequest, res: Response) => {
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

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    updates.forEach((update) => {
      if (req.body[update] !== undefined) {
        (service as any)[update] = req.body[update];
      }
    });

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getServicesByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const services = await Service.find({ category, isAvailable: true }).sort({ name: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
