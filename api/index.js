const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

dotenv.config();
const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000; // Use the PORT environment variable if set, otherwise, use 5000
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
