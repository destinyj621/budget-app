const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
    const expenses = await Expense.find();
    res.render('index', { expenses });
});

// Add a new expense
router.post('/add', async (req, res) => {
    const { name, amount } = req.body;
    const expense = new Expense({ name, amount });
    await expense.save();
    res.redirect('/');
});

// Delete an expense
router.post('/delete/:id', async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
