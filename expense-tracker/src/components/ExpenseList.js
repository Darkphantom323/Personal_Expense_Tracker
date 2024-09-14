import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './expenseList.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
        setFilteredExpenses(data);
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleFilter = () => {
    if (filterType === 'category') {
      fetch(`http://localhost:8080/api/expenses/category/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredExpenses(data);
        })
        .catch((error) => console.error('Error filtering by category:', error));
    } else if (filterType === 'date') {
      fetch(`http://localhost:8080/api/expenses/date?start=${startDate}&end=${endDate}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredExpenses(data);
        })
        .catch((error) => console.error('Error filtering by date:', error));
    } else {
      setFilteredExpenses(expenses);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== id));
          setFilteredExpenses(filteredExpenses.filter((expense) => expense.id !== id));
        } else {
          console.error('Error deleting expense:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  const totalSum = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="page-container">
      <div className="expense-list-container">
        <h3 className="expense-list-title">Filter Expenses</h3>

        <div className="filter-section">
          <div className="filter-type">
            <label>Filter by: </label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option value="">Select Filter Type</option>
              <option value="category">Category</option>
              <option value="date">Date Range</option>
            </select>
          </div>

          {filterType === 'category' && (
            <div className="category-filter">
              <label>Category: </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                className="filter-input"
              />
              <button onClick={handleFilter} className="filter-button">Filter</button>
            </div>
          )}

          {filterType === 'date' && (
            <div className="date-filter">
              <label>Date Range: </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="filter-input"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="filter-input"
              />
              <button onClick={handleFilter} className="filter-button">Filter</button>
            </div>
          )}
        </div>

        {/* Expense Table */}
        <table className="expense-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>
                  <button onClick={() => handleDelete(expense.id)} className="delete-button">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Sum */}
        <div className="total-sum">
          <h4>Total Sum: ${totalSum.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
