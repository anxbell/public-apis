"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Mongodb schemas/models
const apiSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    base_url: { type: String, required: true },
    auth_required: { type: Boolean, required: true },
    added_by: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
    created_at: { type: Date, default: Date.now } //current date
});
exports.Api = mongoose_1.default.model("Api", apiSchema);
