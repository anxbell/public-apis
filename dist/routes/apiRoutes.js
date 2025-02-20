"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../models/api"); // Adjust path if necessary
const router = express_1.default.Router();
//GET all API
/**
 * @swagger
 * /apis:
 *   get:
 *     description: Get all APIs
 *     responses:
 *       200:
 *         description: Successfully fetched APIs
 */
router.get("/", async (req, res) => {
    const apis = await api_1.Api.find();
    res.json(apis);
});
//GET a single API
/**
 * @swagger
 * /apis/{id}:
 *   get:
 *     description: Get a single API by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the API to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched API
 *       404:
 *         description: API not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        const api = await api_1.Api.findById(req.params.id);
        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }
        return res.json(api);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
///POST - Create a new API
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
router.post("/", async (req, res) => {
    try {
        const newApi = new api_1.Api(req.body);
        await newApi.save();
        res.status(201).json(newApi);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// PUT - Update a contact
//updating a contact that returns a 204 status
/**
 * @swagger
 * /apis/{id}:
 *   put:
 *     description: Update an API by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the API to update
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: Successfully updated API
 *       404:
 *         description: API not found
 *       500:
 *         description: Failed to update API
 */
router.put("/:id", async (req, res) => {
    try {
        // Check if the ID exists first
        const apiExists = await api_1.Api.findById(req.params.id);
        if (!apiExists) {
            return res.status(404).json({ message: "API not found" });
        }
        // Update API with validation
        const api = await api_1.Api.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensure validation is run on update
        });
        // If no document is found
        if (!api) {
            return res.status(500).json({ message: "Failed to update API" });
        }
        res.status(200).json(api);
    }
    catch (err) {
        // Handle validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: err
            });
        }
        return res.status(500).json({ message: err.message });
    }
});
// DELETE an API by ID
/**
 * @swagger
 * /apis/{id}:
 *   delete:
 *     description: Delete an API by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the API to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted API
 *       404:
 *         description: API not found
 *       500:
 *         description: Failed to delete API
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedApi = await api_1.Api.findByIdAndDelete(req.params.id);
        if (!deletedApi) {
            return res.status(404).json({ message: 'API not found' });
        }
        res.json({ message: "API deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = router;
