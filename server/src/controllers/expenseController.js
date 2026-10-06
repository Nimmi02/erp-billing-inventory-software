const Expense = require("../models/Expense");

const addExpense = async (req, res) => {

    try {

        const {

            expenseName,
            category,
            amount,
            paymentMethod,
            expenseDate,
            notes

        } = req.body;

        if (

            !expenseName?.trim() ||
            !category?.trim() ||
            amount == null

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields"

            });

        }
if (amount <= 0) {

    return res.status(400).json({

        success: false,
        message: "Amount must be greater than 0"

    });

}
        const expense = await Expense.create({
            companyId: req.user.companyId,
            expenseName: expenseName.trim(),
            category: category.trim(),
            amount,
            paymentMethod,
            expenseDate,
            notes: notes?.trim()

        });

        res.status(201).json({

            success: true,
            message: "Expense Added Successfully",
            expense

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({

    companyId: req.user.companyId

}).sort({

    createdAt: -1

});

        res.status(200).json({

            success: true,
            count: expenses.length,
            expenses

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    addExpense,
    getExpenses

};