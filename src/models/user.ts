import mongoose from "mongoose";
//user schema for mongodb
const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, required: true }, // Store the Google ID (changed username to googleid)
    email: { type: String, unique: true, required: true },//removed password
});
//further use schema
export const User = mongoose.model("User", userSchema);
