import { Request, Response, NextFunction} from "express";
import { User } from "../models/user";
import { promises } from "dns";

//Get all Users

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
//GET user by id
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

//POST - Create a new user 

export const createNewUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        if (!req.body.googleId || !req.body.email) {
            return res.status(400).json({
                message: "You must enter the correct all fields"
            });
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
};

//PUT - Uptdate a User
export const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        if (!req.body.googleId || !req.body.email) {
            return res.status(400).json({
                message: "You must enter the correct all fields"
            });
        }
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,     
            runValidators: true, 
        });

        if (!user) {
            return res.status(500).json({ message: "Failed to update User" });
        }

        // Send the updated user as the response and added text
        return res.status(200).json({
            message: "User updated successfully", // Success message
            user: user // Updated user data
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: "User successfully deleted"
        });
    } catch (error) {
        next(error);
    }
};