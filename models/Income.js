const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);
