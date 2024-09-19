import React, { useEffect, useState } from 'react';
import './summary.css';

const Summary = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [highestCategory, setHighestCategory] = useState('');
  const [numExpenses, setNumExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [topExpenses, setTopExpenses] = useState([]);

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

    // Monthly expense breakdown
    const monthly = data.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
    setMonthlyExpenses(monthly);

    // Recent expenses (last 5)
    const sortedExpenses = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentExpenses(sortedExpenses.slice(0, 5));

    // Top 3 expenses
    const top3 = [...data].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount)).slice(0, 3);
    setTopExpenses(top3);
  };

  return (
    <div className="summary-container">
      <h3 className="summary-title">Expense Summary</h3>
      <div className="summary-details">
        <p><strong>Total Spent:</strong> <span>${totalSpent.toFixed(2)}</span></p>
        <p><strong>Number of Expenses:</strong> <span>{numExpenses}</span></p>
        <p><strong>Highest Spending Category:</strong> <span>{highestCategory || 'N/A'}</span></p>
      </div>

      <div className="cards-container">
        <div className="card monthly-expenses">
          <h4>Monthly Expenses</h4>
          <ul>
            {Object.entries(monthlyExpenses).map(([month, total]) => (
              <li key={month}>
                <span className="expense-date">{month}</span>: <span className="expense-price">${total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card recent-expenses">
          <h4>Recent Expenses</h4>
          <ul>
            {recentExpenses.map(expense => (
              <li key={expense.id}>
                <span className="expense-date">{expense.date}</span>: {expense.description} - <span className="expense-price">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card top-expenses">
          <h4>Top 3 Expenses</h4>
          <ul>
            {topExpenses.map(expense => (
              <li key={expense.id}>
                {expense.description} - <span className="expense-price">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
