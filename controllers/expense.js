const ExpenseSchema = require("../models/expensemodel")

     

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        console.error('Error creating expense:', error);  // Log the full error for debugging
        res.status(500).json({ message: 'Server error. Could not create expense.', error: error.message });  // Send detailed error response
    }
    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        console.error('Error creating expense:', error);  // Log the full error for debugging
        res.status(500).json({ message: 'Server error. Could not create expense.', error: error.message });  // Send detailed error response
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error.Could not create expense.', error: error.message });  // Send detailed error response'})
        })
}