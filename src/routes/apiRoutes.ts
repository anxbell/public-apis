import express, { Request, Response } from "express";
import { getAllApis, getApiById, createNewApi, updateApiById, deleteApiById } from "../controllers/apiController"; // Adjust path if necessary

const router = express.Router();

// GET all APIs
/**
 * @swagger
 * /apis:
 *   get:
 *     description: Get all APIs
 *     responses:
 *       200:
 *         description: Successfully fetched APIs
 */
router.get("/", getAllApis);

// GET a single API
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
router.get("/:id", getApiById);

// POST - Create a new API
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
router.post("/", createNewApi);

// PUT - Update an API
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
router.put("/:id", updateApiById);

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
router.delete("/:id", deleteApiById);

export default router;