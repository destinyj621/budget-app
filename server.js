// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from 'public' directory

// MongoDB connection
mongoose.connect('mongodb+srv://destinyj621:Janiyah621!@budgetapp.mp4sl.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Transaction model
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    name: String,
    amount: Number,
    type: { type: String, enum: ['income', 'expense'] },
    category: String,
    date: { type: Date, default: Date.now }
}));

// Home route
app.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 }).limit(10);
        res.render('index', { transactions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add transaction route
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    const { name, amount, type, category, date } = req.body;
    const transaction = new Transaction({ name, amount, type, category, date });
    await transaction.save();
    res.redirect('/');
});

// View all transactions route
app.get('/viewAll', async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.render('viewAll', { transactions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete transaction route
app.post('/delete/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
