
const Transaction = require("../models/Transaction");

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error fetching transactions" });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    if (!amount || !description || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({ amount, description, category, date });
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error adding transaction" });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server error deleting transaction" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
