package com.example.expensetracker.repository;

import com.example.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Find expenses by category
    List<Expense> findByCategory(String category);

    // Find expenses between two dates
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
