import mongoose from "mongoose";
//user schema for mongodb
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
//further use schema
export const User = mongoose.model("User", userSchema);
