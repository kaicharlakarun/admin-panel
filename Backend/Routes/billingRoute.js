import express from "express";
import {
  createBill,
  getAllBills,
  getBillById,
  getBillsByCustomer,
  updateBillStatus,
  deleteBill,
} from "../Controllers/billingController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { authorizeRoles } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

// Admin / SuperAdmin: create bill
router.post(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  createBill
);

// Admin / SuperAdmin: view all bills
router.get(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  getAllBills
);

// Admin / SuperAdmin: get single bill
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  getBillById
);

// Customer: view own bills (you can tighten this later)
router.get(
  "/customer/:customerId",
  protect,
  getBillsByCustomer
);

// Admin / SuperAdmin: update payment status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "superadmin"),
  updateBillStatus
);

// Admin / SuperAdmin: delete bill
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  deleteBill
);

export default router;
