const router = require("express").Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
// const bcrypt = require("bcrypt");

// Load environment variables from .env file
require("dotenv").config();

router.post("/newUser", async (req, res) => {
  const randomPassword = crypto.randomBytes(8).toString("hex");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    companyName: req.body.companyName,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber,
    remarks: req.body.remarks,
    password: randomPassword,
  });

  try {
    const savedUser = await newUser.save();

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,                  // PLEASE ENTER YOUR EMAIL 
        pass: process.env.EMAIL_PASSWORD,                 // PLEASE ENTER YOUR PASS
      },
    });

    // Verify nodemailer setup
    transporter.verify(function (error, success) {
      if (error) {
        console.error("Error setting up nodemailer:", error);
      } else {
        console.log("Nodemailer is ready to send emails");
      }
    });

    // Send email with random password
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: savedUser.email,
      subject: "Welcome to Your App",
      text: `Your password: ${randomPassword}`,
    };

    // Send email and handle errors
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
