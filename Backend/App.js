import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import adminRoute from "./Routes/adminRoute.js";
import customerRoute from "./Routes/customerRoute.js";
import superadminRoute from "./Routes/superadminRoute.js";

dotenv.config();
const app = express();

// Middlewares
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/customer", customerRoute);
app.use("/api/superadmin", superadminRoute);


// Production static (optional, leave for later)
if (process.env.NODE_ENV === "production") {
  // const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  // });
}

export default app;
