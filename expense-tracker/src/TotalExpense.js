// src/components/TotalExpense.js
import React from 'react';

const TotalExpense = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="total-expense">
      <h2>Total Expense: Rs. {total.toFixed(2)}</h2>
    </div>
  );
};

export default TotalExpense;