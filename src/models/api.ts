import mongoose from "mongoose";

//Mongodb schemas/models
const apiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    base_url: { type: String, required: true },
    auth_required: { type: Boolean, required: true },
    added_by: { type: String, required: true }, 
    created_at: { type: Date, default: Date.now } //current date
});

export const Api = mongoose.model("Api", apiSchema);
