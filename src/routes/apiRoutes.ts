import express, { Request, Response } from "express";
import { Api } from "../models/api"; // Adjust path if necessary
import mongoose from 'mongoose';
const router = express.Router();

/**
 * @swagger
 * /apis:
 *   get:
 *     description: Get all APIs
 *     responses:
 *       200:
 *         description: Successfully fetched APIs
 */
router.get("/", async (req: Request, res: Response) => {
    const apis = await Api.find();
    res.json(apis);
});

/**
 * @swagger
 * /apis:
 *   post:
 *     description: Add a new API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               base_url:
 *                 type: string
 *               auth_required:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Successfully created new API
 *       400:
 *         description: Invalid input
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const newApi = new Api(req.body);
        await newApi.save();
        res.status(201).json(newApi);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});


router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const api = await Api.findById(req.params.id);
        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }
        return res.json(api);
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
    }
});




// DELETE an API by ID

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    console.log("DELETE route hit for ID:", req.params.id); // Debugging line
    try {
        const deletedApi = await Api.findByIdAndDelete(req.params.id);
        if (!deletedApi) {
            return res.status(404).json({ message: 'API not found' });
        }
        res.json({ message: "API deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});




export default router;
