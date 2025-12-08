import express from "express";
import {
  registerCustomer,
  loginCustomer,
  forgotPasswordCustomer,
  resetPasswordCustomer,
} from "../Controllers/customerController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/forgot-password", forgotPasswordCustomer);
router.post("/reset-password/:token", resetPasswordCustomer);

export default router;
