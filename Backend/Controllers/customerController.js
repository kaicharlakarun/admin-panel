import Customer from "../Models/Customer/customer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// POST /api/customer/register
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Customer with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      message: "Customer registered successfully",
      customer: {
        id: newCustomer._id,
        name: newCustomer.name,
        email: newCustomer.email,
        role: newCustomer.role,
      },
    });
  } catch (error) {
    console.error("Error in registerCustomer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/customer/login
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
      },
    });
  } catch (error) {
    console.error("Error in loginCustomer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const forgotPasswordCustomer = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "No customer found with this email" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    customer.resetPasswordToken = hashedToken;
    customer.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
    await customer.save({ validateBeforeSave: false });

    // This could be your frontend URL later
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/customer/reset-password/${resetToken}`;

    const message = `
You requested a password reset.

Click the link below to reset your password:
${resetUrl}

This link is valid for 15 minutes.
If you did not request this, please ignore this email.
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
      from: `"WhatNot Store" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: "Customer Password Reset Request",
      text: message,
    });

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgotPasswordCustomer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/customer/reset-password/:token
export const resetPasswordCustomer = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const customer = await Customer.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!customer) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    customer.password = hashedPassword;
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpire = undefined;

    await customer.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPasswordCustomer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
