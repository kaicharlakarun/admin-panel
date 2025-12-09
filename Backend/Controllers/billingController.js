import Billing from "../Models/Billing/billing.js";

// POST /api/billing
// Create a new bill (admin/superadmin)
export const createBill = async (req, res) => {
  try {
    const {
      customer,
      items,
      subTotal,
      taxAmount = 0,
      discountAmount = 0,
      grandTotal,
      paymentStatus,
      paymentMethod,
    } = req.body;

    if (!customer || !items || !items.length || !subTotal || !grandTotal) {
      return res
        .status(400)
        .json({ message: "Customer, items, subTotal and grandTotal are required" });
    }

    const bill = await Billing.create({
      customer,
      createdBy: req.user?.id, // from auth middleware if available
      items,
      subTotal,
      taxAmount,
      discountAmount,
      grandTotal,
      paymentStatus,
      paymentMethod,
    });

    return res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    console.error("Error in createBill:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/billing
// Get all bills (admin/superadmin)
export const getAllBills = async (req, res) => {
  try {
    const bills = await Billing.find()
      .populate("customer", "name email")
      .populate("createdBy", "username email");

    return res.status(200).json({ bills });
  } catch (error) {
    console.error("Error in getAllBills:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/billing/:id
// Get single bill by id
export const getBillById = async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id)
      .populate("customer", "name email")
      .populate("createdBy", "username email");

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    return res.status(200).json({ bill });
  } catch (error) {
    console.error("Error in getBillById:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/billing/customer/:customerId
// Get all bills for one customer
export const getBillsByCustomer = async (req, res) => {
  try {
    const bills = await Billing.find({ customer: req.params.customerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ bills });
  } catch (error) {
    console.error("Error in getBillsByCustomer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/billing/:id/status
// Update paymentStatus
export const updateBillStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: "paymentStatus is required" });
    }

    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    return res
      .status(200)
      .json({ message: "Payment status updated", bill });
  } catch (error) {
    console.error("Error in updateBillStatus:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/billing/:id
// Delete bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    return res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBill:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
