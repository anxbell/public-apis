import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
//npx ts-node src/server.ts

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


//apis route
app.use("/apis", apiRoutes);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("API success");
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
