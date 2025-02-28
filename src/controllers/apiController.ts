import { Request, Response } from "express";
import { Api } from "../models/api"; // Adjust path if necessary

// GET all APIs
export const getAllApis = async (req: Request, res: Response) => {
    try {
        const apis = await Api.find();
        res.json(apis);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

// GET a single API by ID
export const getApiById = async (req: Request, res: Response): Promise<any> => {
    try {
        const api = await Api.findById(req.params.id);
        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }
        return res.json(api);
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
    }
};

// POST - Create a new API
export const createNewApi = async (req: Request, res: Response) => {
    try {
        const newApi = new Api(req.body);
        await newApi.save();
        res.status(201).json(newApi);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// PUT - Update an API
export const updateApiById = async (req: Request, res: Response): Promise<any> => {
    try {
        const apiExists = await Api.findById(req.params.id);
        if (!apiExists) {
            return res.status(404).json({ message: "API not found" });
        }

        const api = await Api.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!api) {
            return res.status(500).json({ message: "Failed to update API" });
        }

        res.status(200).json(api);
    } catch (err) {
        if ((err as Error).name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: (err as Error)
            });
        }
        return res.status(500).json({ message: (err as Error).message });
    }
};

// DELETE an API by ID
export const deleteApiById = async (req: Request, res: Response): Promise<any> => {
    try {
        const deletedApi = await Api.findByIdAndDelete(req.params.id);
        if (!deletedApi) {
            return res.status(404).json({ message: 'API not found' });
        }
        res.json({ message: "API deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
