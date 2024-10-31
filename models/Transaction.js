const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true }, // 'income' or 'expense'
    category: { type: String, required: true }, // New category field
    date: { type: Date, default: Date.now } // Date field
});

module.exports = mongoose.model('Transaction', transactionSchema);
