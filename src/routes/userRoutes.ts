import express from "express";
import {createNewUser, getAllUsers, getUserById, updateUserById, deleteUserById} from "../controllers/userController"

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createNewUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;