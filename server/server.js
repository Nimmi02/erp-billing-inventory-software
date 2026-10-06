const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const productRoutes = require("./src/routes/productRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const purchaseRoutes = require("./src/routes/purchaseRoutes");
const salesRoutes = require("./src/routes/salesRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const settingsRoutes = require("./src/routes/settingsRoutes");
const { protect } = require("./src/middleware/authMiddleware");
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ERP Billing & Inventory Backend Running Successfully"
    });
});
app.get("/api/profile", protect, (req, res) => {

    res.status(200).json({

        success: true,
        user: req.user

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});