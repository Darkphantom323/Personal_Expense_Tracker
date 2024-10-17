package com.example.expensetracker.service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Add a new expense
    // Add a new expense and update the cache
    @CachePut(value = "expenses", key = "#expense.id")
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Get all expenses
    // Get all expenses (no caching because it's a large dataset)
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Cache the total expenses
    @Cacheable(value = "totalExpenses")
    public Double getTotalExpenses() {
        return expenseRepository.findAll()
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }


    // Find expenses by category
    // Cache the result for expenses by category
    @Cacheable(value = "expensesByCategory", key = "#category")
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }

    // Find expenses by date range
    // Cache the result for expenses by date range
    @Cacheable(value = "expensesByDateRange", key = "{#startDate, #endDate}")
    public List<Expense> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    // Find expense by ID
    // Cache expense by ID
    @Cacheable(value = "expenses", key = "#id")
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    // Delete an expense by ID
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
    // Evict cached data for deleted expense
    @CacheEvict(value = "expenses", key = "#id")
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // Clear all caches related to expenses
    @CacheEvict(value = {"expenses", "totalExpenses", "expensesByCategory", "expensesByDateRange"}, allEntries = true)
    public void clearAllCaches() {
        // Optional method to clear all expense-related caches
    }
}
