const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Expense = require("../models/Expense");
const getDashboard = async (req, res) => {

    try {
        const currentDate = new Date();

const firstDayOfMonth = new Date(

    currentDate.getFullYear(),
    currentDate.getMonth(),
    1

);

const lastDayOfMonth = new Date(

    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999

);

        const totalProducts = await Product.countDocuments({

    companyId: req.user.companyId

});

        const totalCustomers = await Customer.countDocuments({

    companyId: req.user.companyId

});

        const totalVendors = await Vendor.countDocuments({

    companyId: req.user.companyId

});
        const sales = await Sale.find({

    companyId: req.user.companyId

});

const monthlySales = await Sale.find({

    companyId: req.user.companyId,

    saleDate: {

        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth

    }

});

const totalSales = sales.reduce((total, sale) => {

    return total + sale.totalAmount;

}, 0);
const monthlySalesAmount = monthlySales.reduce((total, sale) => {

    return total + sale.totalAmount;

}, 0);
const purchases = await Purchase.find({

    companyId: req.user.companyId

});

const monthlyPurchases = await Purchase.find({

    companyId: req.user.companyId,

    purchaseDate: {

        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth

    }

});
const totalPurchase = purchases.reduce((total, purchase) => {

    return total + purchase.totalAmount;

}, 0);
const monthlyPurchaseAmount = monthlyPurchases.reduce((total, purchase) => {

    return total + purchase.totalAmount;

}, 0);
const expenses = await Expense.find({

    companyId: req.user.companyId

});

const monthlyExpenses = await Expense.find({

    companyId: req.user.companyId,

    expenseDate: {

        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth

    }

});
const totalExpenses = expenses.reduce((total, expense) => {

    return total + expense.amount;

}, 0);
const monthlyExpenseAmount = monthlyExpenses.reduce((total, expense) => {

    return total + expense.amount;

}, 0);
const profit = totalSales - totalPurchase - totalExpenses;
const recentSales = await Sale.find({

    companyId: req.user.companyId

})
.sort({ createdAt: -1 })
.limit(5)
.select("customerName productName quantity totalAmount saleDate");
    const recentPurchases = await Purchase.find({

    companyId: req.user.companyId

})
.sort({ createdAt: -1 })
.limit(5)
.select("vendorName productName quantity totalAmount purchaseDate");
    const lowStockProducts = await Product.find({

    companyId: req.user.companyId,

    stock: {

        $lte: 10

    }

})
.select("productName productCode stock")
.sort({ stock: 1 });
        res.status(200).json({

            success: true,

            dashboard: {

    totalProducts,
    totalCustomers,
    totalVendors,

    totalSales,
    monthlySalesAmount,

    totalPurchase,
    monthlyPurchaseAmount,

    totalExpenses,
    monthlyExpenseAmount,

    profit,

    recentSales,

    recentPurchases,

    lowStockProducts

}        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    getDashboard

};