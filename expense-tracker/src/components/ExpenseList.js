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
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then((response) => response.json())
      .then((data) => {
        // Sort expenses by date in descending order
        const sortedExpenses = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sortedExpenses);
        setFilteredExpenses(sortedExpenses);
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleFilter = () => {
    let filteredData = expenses;

    if (filterType === 'category' && category) {
      filteredData = expenses.filter((expense) => expense.category.toLowerCase() === category.toLowerCase());
    } else if (filterType === 'date' && startDate && endDate) {
      filteredData = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
      });
    }

    // Always sort filtered expenses by date in descending order
    const sortedFilteredExpenses = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredExpenses(sortedFilteredExpenses);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedExpenses = expenses.filter((expense) => expense.id !== id);
          setExpenses(updatedExpenses);
          setFilteredExpenses(updatedExpenses);
        } else {
          console.error('Error deleting expense:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  const totalSum = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  // Pagination logic
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <div className="expense-list-container">
        <h3 className="expense-list-title">Filter Expenses</h3>

        <div className="filter-section">
          <div className="filter-type">
            <label>Filter by: </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
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
            {currentExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>${parseFloat(expense.amount).toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
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

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredExpenses.length / expensesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Total Sum */}
        <div className="total-sum">
          <h4>Total Sum: ${totalSum.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
