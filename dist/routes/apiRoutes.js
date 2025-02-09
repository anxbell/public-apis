"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../models/api"); // Adjust path if necessary
const router = express_1.default.Router();
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
// DELETE an API by ID
// router.delete("/:id", async (req: Request, res: Response) => {
//     try {
//         const api = await Api.findByIdAndDelete(req.params.id);
//         if (!api) return res.status(404).json({ message: 'API not found' });
//         res.json({ message: "API deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: (err as Error).message });
//     }
// });
exports.default = router;
