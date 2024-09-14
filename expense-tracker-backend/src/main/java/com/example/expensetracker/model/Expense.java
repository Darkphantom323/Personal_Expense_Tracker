package com.example.expensetracker.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data  // Lombok annotation to generate getters, setters, and toString methods
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private LocalDate date;

    @Column(length = 255)  // Optional description with a max length
    private String description;

    // Constructors, getters, and setters will be handled by Lombok (@Data)
}
