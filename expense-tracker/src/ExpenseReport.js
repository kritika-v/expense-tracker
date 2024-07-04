import React, { useState, useEffect } from "react";
import TotalExpense from "./TotalExpense";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    if (expenses?.length) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleAddExpense = () => {
    if (!title || !amount) return;

    const newExpense = { id: Date.now(), title, amount: parseFloat(amount) };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const handleEditExpense = (expense) => {
    setEditing(true);
    setCurrentExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
  };

  const handleUpdateExpense = () => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === currentExpense.id
        ? { ...expense, title, amount: parseFloat(amount) }
        : expense
    );
    setExpenses(updatedExpenses);
    setEditing(false);
    setCurrentExpense(null);
    setTitle("");
    setAmount("");
  };

  const handleDeleteExpense = (id) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(filteredExpenses);
  };

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdateExpense}>Update Expense</button>
        ) : (
          <button onClick={handleAddExpense}>Add Expense</button>
        )}
      </div>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.title}: Rs.{expense.amount}
              <button onClick={() => handleEditExpense(expense)}>Edit</button>
              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <TotalExpense expenses={expenses} />
    </div>
  );
};

export default ExpenseTracker;
