import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import apiRoutes from "./routes/apiRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import session from "express-session";
import passport from "passport";
import "./config/auth"; //oauth config
//npx ts-node src/server.ts

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
}));

// Initialize Google Passport
app.use(passport.initialize());
app.use(passport.session());

//CORS settings
const RENDER_URL = process.env.RENDER_URL || 'http://localhost:8080';

app.use(cors({
  origin: [RENDER_URL, 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add OPTIONS method to handle preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'],    // Allow specific headers if needed
  credentials: true,  // If sending credentials like cookies or auth headers,this might be needed
}));

//----- ROUTES ------

//APIs route
app.use("/apis", apiRoutes);

//swagger
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Google Auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth callback route
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }), 
  (req, res) => {
    res.redirect("/profile");
  }
);

// Profile route (authenticated users only)
app.get("/profile", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.json(req.user); // Send user info to the client
});

//login route

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err); // Log errors
    }
    res.send("Logged out"); // Redirect after logout
  });
});


//If you’re not logged 
app.get("/login", (req: Request, res: Response) => {
  res.send("Please log in using Google.");
});



// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("API success");
});


// Global Error Handling Middleware (after routes)
app.use((err: any, req: Request, res: Response, next: NextFunction): void=> {
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
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}
connectDB();

//start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//test oauth flow

//http://localhost:8080/auth/google
