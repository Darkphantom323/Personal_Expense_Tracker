import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Filler,
  Title,
  Zoom // Import Zoom Plugin
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import './charts.css';

// Register the chart components and the zoom plugin
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Filler,
  Title,
  zoomPlugin
);

const Charts = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedChart, setSelectedChart] = useState('category');

  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then(response => response.json())
      .then(data => {
        const sortedExpenses = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setExpenses(sortedExpenses);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  // Function to group expenses by period (day, month, year)
  const groupExpensesByPeriod = (period) => {
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      let periodKey;

      if (period === 'day') {
        periodKey = date.toISOString().split('T')[0];
      } else if (period === 'month') {
        periodKey = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
      } else if (period === 'year') {
        periodKey = date.getFullYear();
      }

      acc[periodKey] = (acc[periodKey] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
  };

  // Create the data objects for the charts
  const dailyData = groupExpensesByPeriod('day');
  const dailyLabels = Object.keys(dailyData).sort();
  const dailyValues = dailyLabels.map(label => dailyData[label]);

  const monthlyData = groupExpensesByPeriod('month');
  const monthlyLabels = Object.keys(monthlyData).sort();
  const monthlyValues = monthlyLabels.map(label => monthlyData[label]);

  const yearlyData = groupExpensesByPeriod('year');
  const yearlyLabels = Object.keys(yearlyData).sort();
  const yearlyValues = yearlyLabels.map(label => yearlyData[label]);

  // Chart options with zoom and pan enabled
  const interactiveChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: selectedChart === 'daily' ? 'day' : selectedChart === 'monthly' ? 'month' : 'year',
        },
        ticks: {
          maxTicksLimit: 10,
          color: 'var(--text-color)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'var(--text-color)',
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'var(--text-color)',
        },
      },
    },
  };

  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6347', '#4BC0C0'],
        hoverOffset: 10,
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'var(--text-color)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'var(--text-color)',
        },
      },
      y: {
        ticks: {
          color: 'var(--text-color)',
        },
      },
    },
  };

  

  return (
    <div className="chart-container">
      <h3 className="chart-title">Expense Charts</h3>
      <div className="chart-dropdown">
        <select onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
          <option value="category">Category</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {selectedChart === 'category' && (
       <div className="chart-section">
       <h4>Spending Distribution by Category</h4>
       {expenses.length ? <Pie data={categoryData} options={pieChartOptions} /> : <p className="no-data-message">No expenses available to display.</p>}
       </div>
      )}

      {selectedChart === 'daily' && (
        <div className="chart-section">
          <h4>Daily Expenses</h4>
          {expenses.length ? (
            <Bar data={{ labels: dailyLabels, datasets: [{ label: 'Daily Expenses', data: dailyValues, backgroundColor: '#FF6384' }] }}
                 options={interactiveChartOptions} />
          ) : <p className="no-data-message">No expenses available to display.</p>}
        </div>
      )}

      {selectedChart === 'monthly' && (
        <div className="chart-section">
          <h4>Monthly Expenses</h4>
          {expenses.length ? (
            <Bar data={{ labels: monthlyLabels, datasets: [{ label: 'Monthly Expenses', data: monthlyValues, backgroundColor: '#36A2EB' }] }}
                 options={interactiveChartOptions} />
          ) : <p className="no-data-message">No expenses available to display.</p>}
        </div>
      )}

      {selectedChart === 'yearly' && (
        <div className="chart-section">
          <h4>Yearly Expenses</h4>
          {expenses.length ? (
            <Bar data={{ labels: yearlyLabels, datasets: [{ label: 'Yearly Expenses', data: yearlyValues, backgroundColor: '#4BC0C0' }] }}
                 options={interactiveChartOptions} />
          ) : <p className="no-data-message">No expenses available to display.</p>}
        </div>
      )}
    </div>
  );
};

export default Charts;
