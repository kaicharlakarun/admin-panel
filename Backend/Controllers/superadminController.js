import SuperAdmin from "../Models/SuperAdmin/superAdmin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// POST /api/superadmin/register
export const registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Super admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSuperAdmin = await SuperAdmin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Super admin registered successfully",
      superadmin: {
        id: newSuperAdmin._id,
        name: newSuperAdmin.name,
        email: newSuperAdmin.email,
        role: newSuperAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error in registerSuperAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/superadmin/login
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const superadmin = await SuperAdmin.findOne({ email });
    if (!superadmin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, superadmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: superadmin._id, role: superadmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      superadmin: {
        id: superadmin._id,
        name: superadmin.name,
        email: superadmin.email,
        role: superadmin.role,
      },
    });
  } catch (error) {
    console.error("Error in loginSuperAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/superadmin/forgot-password
export const forgotPasswordSuperAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const superadmin = await SuperAdmin.findOne({ email });
    if (!superadmin) {
      return res
        .status(404)
        .json({ message: "No super admin found with this email" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    superadmin.resetPasswordToken = hashedToken;
    superadmin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await superadmin.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/superadmin/reset-password/${resetToken}`;

    const message = `
You requested a password reset for your SuperAdmin account.

Click the link below to reset your password:
${resetUrl}

This link is valid for 15 minutes.
If you did not request this, ignore this email.
`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.SMTP_USER}>`,
      to: superadmin.email,
      subject: "SuperAdmin Password Reset Request",
      text: message,
    });

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgotPasswordSuperAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/superadmin/reset-password/:token
export const resetPasswordSuperAdmin = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const superadmin = await SuperAdmin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!superadmin) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    superadmin.password = hashedPassword;
    superadmin.resetPasswordToken = undefined;
    superadmin.resetPasswordExpire = undefined;

    await superadmin.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPasswordSuperAdmin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
