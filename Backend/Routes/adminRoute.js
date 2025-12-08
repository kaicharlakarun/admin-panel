import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
} from "../Controllers/adminController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { authorizeRoles } from "../Middlewares/roleMiddleware.js";

const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPasswordAdmin);
router.post("/reset-password/:token", resetPasswordAdmin);



// Example: only logged-in admin or superadmin can access
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin", "superadmin"),
  (req, res) => {
    res.json({
      message: "Admin dashboard data",
      user: req.user, // { id, role }
    });
  }
);

// Example: only superadmin can view all admins
router.get(
  "/all-admins",
  protect,
  authorizeRoles("superadmin"),
  (req, res) => {
    res.json({ message: "Only superadmin can see this route." });
  }
);

export default router;
