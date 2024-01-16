const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single product by ID
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get products by category
router.get("/find/category/:Category", async (req, res) => {
  try {
    const products = await Product.find({ Category: req.params.Category });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({
          error: `Products not found for the category ${req.params.Category}`,
        });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get products by Chemistry
router.get("/find/chemistry/:Chemistry", async (req, res) => {
  try {
    const products = await Product.find({ Chemistry: req.params.Chemistry });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({
          error: `Products not found for the chemistry ${req.params.Chemistry}`,
        });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get products by Process
router.get("/find/process/:Process", async (req, res) => {
  try {
    const products = await Product.find({ Process: req.params.Process });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({
          error: `Products not found for the process ${req.params.Process}`,
        });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get product for modals

module.exports = router;
