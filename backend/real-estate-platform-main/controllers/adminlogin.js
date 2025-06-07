const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const User = require("../models/User");

const SECRET = "bearer"; // In production, move to .env

const adminRouter = express.Router();

// ====================== ADMIN LOGIN ======================
adminRouter.post("/", async (req, res) => {
  try {
    const { adminId, password } = req.body;
    const admin = await Admin.findOne({ adminId });

    if (!admin) {
      return res.status(401).json({ error: "Invalid admin ID or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid admin ID or password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        adminId: admin.adminId,
        email: admin.email,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, adminId: admin.adminId });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ====================== ADMIN UPDATE ======================
adminRouter.put("/update", async (req, res) => {
  try {
    const { adminId, ...updateData } = req.body;

    if (!adminId) {
      return res.status(400).json({ error: "adminId is required" });
    }

    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const token = jwt.sign(
      {
        id: updatedAdmin._id,
        adminId: updatedAdmin.adminId,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Admin updated successfully",
      token,
      adminId: updatedAdmin.adminId,
    });
  } catch (error) {
    console.error("Admin update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ====================== GET ALL USERS (ADMIN DASHBOARD) ======================
adminRouter.get("/users", async (req, res) => {
  try {
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ error: "adminId is required" });
    }

    const adminExists = await Admin.findOne({ adminId });
    if (!adminExists) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const users = await User.find()
      .populate("saveProperties.propertyId")
      .populate("previousView.propertyId");

    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = adminRouter;
