// Controllers/adminController.js

import Admin from "../Models/Admin/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// POST /api/admin/register
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    const adminData = {
      _id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
    };

    res.status(201).json({
      message: "Admin registered successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const adminData = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    res.status(200).json({
      message: "Login successful",
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📧 POST /api/admin/forgot-password
export const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "No admin found with this email" });
    }

    // Generate reset token (raw)
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await admin.save({ validateBeforeSave: false });

    // Replace hardcoded URL with your frontend route if needed
    const resetUrl = `${req.protocol}://${req.get("host")}/api/admin/reset-password/${resetToken}`;

    const message = `
You requested a password reset.

Click the link below to reset your password:
${resetUrl}

This link is valid for 15 minutes.
If you did not request this, ignore this email.
`;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.SMTP_USER}>`,
      to: admin.email,
      subject: "Password Reset Request",
      text: message,
    });

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });

  } catch (error) {
    console.error("Error in forgotPasswordAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 🔁 POST /api/admin/reset-password/:token
export const resetPasswordAdmin = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;

    // Clear reset token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    return res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Error in resetPasswordAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
