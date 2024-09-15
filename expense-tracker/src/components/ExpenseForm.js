import React, { useState } from 'react';
import "./expenseForm.css";

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { amount, category, date, description };

    fetch('http://localhost:8080/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Expense added:', data);
    })
    .catch(error => console.error('Error adding expense:', error));
  };

  return (
    <div className="expense-page-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="expense-input"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="expense-input"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="expense-input"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (Optional)"
          className="expense-input"
        />
        <button type="submit" className="expense-button">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
