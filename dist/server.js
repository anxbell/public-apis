"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
//npx ts-node src/server.ts
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
// Configure CORS to allow multiple origins
app.use((0, cors_1.default)({
    origin: ['http://localhost:8080', 'https://publicapis.onrender.com', 'https://publicapis.onrender.com/api-docs', 'https://publicapis.onrender.com/api-docs'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add OPTIONS method to handle preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
    credentials: true, // If you're sending credentials like cookies or auth headers, you might need this
}));
//apis route
app.use("/apis", apiRoutes_1.default);
//swagger
app.use("/api-docs", (0, cors_1.default)(), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const PORT = process.env.PORT || 8080;
// Basic route
app.get("/", (req, res) => {
    res.send("API success");
});
// Global Error Handling Middleware (after routes)
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
    if (err instanceof SyntaxError) {
        // Catch invalid JSON parsing errors
        res.status(400).json({ message: "Invalid JSON format", error: err.message });
    }
    // Handle other types of errors (e.g., validation errors)
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});
// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}
connectDB();
//start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
