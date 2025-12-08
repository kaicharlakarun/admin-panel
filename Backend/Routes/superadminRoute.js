import express from "express";
import {
  registerSuperAdmin,
  loginSuperAdmin,
  forgotPasswordSuperAdmin,
  resetPasswordSuperAdmin,
} from "../Controllers/superadminController.js";

const router = express.Router();

// Auth endpoints
router.post("/register", registerSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/forgot-password", forgotPasswordSuperAdmin);
router.post("/reset-password/:token", resetPasswordSuperAdmin);

export default router;
