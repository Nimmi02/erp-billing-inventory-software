const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Expense = require("../models/Expense");
const getReports = async (req,res)=>{

try{
    const sales =
await Sale.find().sort({createdAt:-1});

const purchases =
await Purchase.find().sort({createdAt:-1});

const products =
await Product.find();

const customers =
await Customer.find();

const vendors =
await Vendor.find();

const expenses =
await Expense.find();
const totalSales =
sales.reduce(

(total,sale)=>

total + sale.totalAmount,

0

);

const totalPurchase =
purchases.reduce(

(total,purchase)=>

total + purchase.totalAmount,

0

);

const totalExpense =
expenses.reduce(

(total,expense)=>

total + expense.amount,

0

);

const totalProfit =
totalSales -
totalPurchase -
totalExpense;

const report = {

totalSales,

totalPurchase,

totalExpense,

totalProfit,

totalCustomers:
customers.length,

totalVendors:
vendors.length,

totalProducts:
products.length,

sales,

purchases,

products,

customers,

vendors,

expenses

};
res.status(200).json({

success:true,

report

});
}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};
module.exports = {

getReports

};