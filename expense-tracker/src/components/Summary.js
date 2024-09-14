import React, { useEffect, useState } from 'react';
import './summary.css';

const Summary = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [highestCategory, setHighestCategory] = useState('');
  const [numExpenses, setNumExpenses] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
        calculateSummary(data);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  const calculateSummary = (data) => {
    // Calculate total spent
    const total = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalSpent(total);

    // Count the number of expenses
    setNumExpenses(data.length);

    // Find the highest spending category
    const categoryTotals = data.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    const highest = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, '');
    setHighestCategory(highest);
  };

  return (
    <div className="summary-container">
      <h3 className="summary-title">Expense Summary</h3>
      <div className="summary-details">
        <p><strong>Total Spent:</strong> <span>${totalSpent.toFixed(2)}</span></p>
        <p><strong>Number of Expenses:</strong> <span>{numExpenses}</span></p>
        <p><strong>Highest Spending Category:</strong> <span>{highestCategory || 'N/A'}</span></p>
      </div>
    </div>
  );
};

export default Summary;
