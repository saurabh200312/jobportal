import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // frontend ka URL
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to DB first, then start server
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;

//api's 
app.use("/api/users", userRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
