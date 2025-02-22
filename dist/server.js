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
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./config/auth"); //oauth config
//npx ts-node src/server.ts
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Session config
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
}));
// Initialize Google Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//CORS settings
const RENDER_URL = process.env.RENDER_URL || 'http://localhost:8080';
app.use((0, cors_1.default)({
    origin: [RENDER_URL, 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add OPTIONS method to handle preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
    credentials: true, // If sending credentials like cookies or auth headers,this might be needed
}));
//----- ROUTES ------
//APIs route
app.use("/apis", apiRoutes_1.default);
//swagger
app.use("/api-docs", (0, cors_1.default)(), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Google Auth routes
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google Auth callback route
app.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/profile");
});
// Profile route (authenticated users only)
app.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.json(req.user); // Send user info to the client
});
// Logout
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err); // Log errors
        }
        res.redirect("/"); // Redirect after logout
    });
});
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
