"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//user schema for mongodb
const userSchema = new mongoose_1.default.Schema({
    googleId: { type: String, unique: true, required: true }, // Store the Google ID (changed username to googleid)
    email: { type: String, unique: true, required: true }, //removed password
});
//further use schema
exports.User = mongoose_1.default.model("User", userSchema);
