#!/bin/bash

# Base API URL
URL="http://localhost:8080/api/expenses"

# Array of expense entries for October 2023 to August 2024
expenses=(
# October 2023
'{"amount": 220.50, "category": "Rent/Utilities", "date": "2023-10-01", "description": "Monthly rent payment for October."}'
'{"amount": 45.30, "category": "Groceries", "date": "2023-10-02", "description": "Bought fresh produce and dairy."}'
'{"amount": 85.00, "category": "Transportation", "date": "2023-10-03", "description": "Monthly subway pass."}'
'{"amount": 15.00, "category": "Subscription/Entertainment", "date": "2023-10-05", "description": "Streaming service renewal."}'
'{"amount": 120.99, "category": "Shopping", "date": "2023-10-07", "description": "New shoes for the fall season."}'
'{"amount": 62.50, "category": "Dining/Entertainment", "date": "2023-10-09", "description": "Dinner with friends at Italian restaurant."}'
'{"amount": 35.00, "category": "Transportation/Car Maintenance", "date": "2023-10-11", "description": "Car wash and cleaning."}'
'{"amount": 90.50, "category": "Healthcare", "date": "2023-10-15", "description": "Medical consultation fee."}'

# November 2023
'{"amount": 210.00, "category": "Rent/Utilities", "date": "2023-11-01", "description": "Rent for shared apartment."}'
'{"amount": 53.45, "category": "Groceries", "date": "2023-11-03", "description": "Grocery shopping for the week."}'
'{"amount": 45.00, "category": "Dining/Entertainment", "date": "2023-11-06", "description": "Brunch with coworkers."}'
'{"amount": 135.00, "category": "Shopping", "date": "2023-11-08", "description": "Winter coat purchase."}'
'{"amount": 55.00, "category": "Transportation", "date": "2023-11-10", "description": "Rideshare for business trip."}'
'{"amount": 98.25, "category": "Subscription/Utilities", "date": "2023-11-12", "description": "Electricity bill for November."}'
'{"amount": 22.99, "category": "Subscription/Entertainment", "date": "2023-11-15", "description": "Online course subscription renewal."}'

# December 2023
'{"amount": 250.00, "category": "Rent/Utilities", "date": "2023-12-01", "description": "Rent payment for December."}'
'{"amount": 38.60, "category": "Groceries", "date": "2023-12-04", "description": "Grocery run before holiday season."}'
'{"amount": 89.99, "category": "Shopping", "date": "2023-12-10", "description": "Holiday gifts for family."}'
'{"amount": 72.50, "category": "Dining", "date": "2023-12-12", "description": "Dinner at a new restaurant."}'
'{"amount": 29.99, "category": "Subscription/Utilities", "date": "2023-12-15", "description": "Monthly cloud storage fee."}'
'{"amount": 19.99, "category": "Subscription/Entertainment", "date": "2023-12-18", "description": "Magazine subscription renewal."}'

# January 2024
'{"amount": 210.00, "category": "Rent/Utilities", "date": "2024-01-01", "description": "Rent for January 2024."}'
'{"amount": 63.50, "category": "Groceries", "date": "2024-01-05", "description": "Stocked up on New Year groceries."}'
'{"amount": 99.99, "category": "Shopping", "date": "2024-01-08", "description": "New clothes during winter sales."}'
'{"amount": 32.50, "category": "Dining/Entertainment", "date": "2024-01-12", "description": "Lunch with colleagues."}'
'{"amount": 85.75, "category": "Healthcare", "date": "2024-01-14", "description": "Pharmacy expenses."}'
'{"amount": 110.99, "category": "Transportation", "date": "2024-01-15", "description": "New set of tires for the car."}'
'{"amount": 22.99, "category": "Subscription", "date": "2024-01-18", "description": "Music streaming service."}'

# February 2024
'{"amount": 200.00, "category": "Rent/Utilities", "date": "2024-02-01", "description": "Rent for February."}'
'{"amount": 55.45, "category": "Groceries", "date": "2024-02-05", "description": "Weekly grocery shopping."}'
'{"amount": 48.75, "category": "Dining/Entertainment", "date": "2024-02-09", "description": "Dinner at a local diner."}'
'{"amount": 120.50, "category": "Shopping", "date": "2024-02-12", "description": "Bought a new smartwatch."}'
'{"amount": 98.99, "category": "Transportation", "date": "2024-02-14", "description": "Gas tank refill for road trip."}'
'{"amount": 16.99, "category": "Subscription/Utilities", "date": "2024-02-17", "description": "Software subscription renewal."}'

# March 2024
'{"amount": 230.00, "category": "Rent/Utilities", "date": "2024-03-01", "description": "Rent payment for March."}'
'{"amount": 70.00, "category": "Groceries", "date": "2024-03-05", "description": "Weekly grocery shopping."}'
'{"amount": 45.99, "category": "Shopping", "date": "2024-03-08", "description": "Bought a pair of sneakers."}'
'{"amount": 89.50, "category": "Dining", "date": "2024-03-10", "description": "Weekend brunch with friends."}'
'{"amount": 65.00, "category": "Transportation", "date": "2024-03-12", "description": "Monthly bus pass."}'

# April 2024
'{"amount": 250.00, "category": "Rent/Utilities", "date": "2024-04-01", "description": "Rent payment for April."}'
'{"amount": 60.30, "category": "Groceries", "date": "2024-04-03", "description": "Groceries for the week."}'
'{"amount": 95.99, "category": "Shopping", "date": "2024-04-06", "description": "New spring wardrobe."}'
'{"amount": 45.75, "category": "Dining", "date": "2024-04-08", "description": "Lunch with friends."}'

# May 2024
'{"amount": 220.00, "category": "Rent/Utilities", "date": "2024-05-01", "description": "Rent payment for May."}'
'{"amount": 55.20, "category": "Groceries", "date": "2024-05-03", "description": "Grocery run."}'
'{"amount": 35.00, "category": "Dining/Entertainment", "date": "2024-05-05", "description": "Dinner at a local restaurant."}'

# June 2024
'{"amount": 200.00, "category": "Rent/Utilities", "date": "2024-06-01", "description": "Rent payment for June."}'
'{"amount": 48.60, "category": "Groceries", "date": "2024-06-03", "description": "Weekly grocery shopping."}'

# July 2024
'{"amount": 215.00, "category": "Rent/Utilities", "date": "2024-07-01", "description": "Rent payment for July."}'
'{"amount": 65.45, "category": "Groceries", "date": "2024-07-05", "description": "Groceries for BBQ party."}'
'{"amount": 55.00, "category": "Transportation", "date": "2024-07-07", "description": "Fuel for summer road trip."}'

# August 2024
'{"amount": 250.00, "category": "Rent/Utilities", "date": "2024-08-01", "description": "Rent for August."}'
'{"amount": 75.50, "category": "Groceries", "date": "2024-08-03", "description": "Groceries for summer gatherings."}'
'{"amount": 50.00, "category": "Dining", "date": "2024-08-06", "description": "Dinner with family at the beach."}'
)

# Loop through each expense and make the API call
for expense in "${expenses[@]}"; do
  curl -X POST "$URL" -H "Content-Type: application/json" -d "$expense"
  echo "Inserted: $expense"
done
