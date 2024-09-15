#!/bin/bash

# Base API URL
URL="http://localhost:8080/api/expenses"

# Array of expense entries for September 2023
expenses=(
'{"amount": 110.50, "category": "Transportation", "date": "2023-09-05", "description": "Monthly bus pass for work commute."}'
'{"amount": 52.75, "category": "Groceries", "date": "2023-09-03", "description": "Stocked up on pantry essentials and fresh produce."}'
'{"amount": 215.00, "category": "Rent/Utilities", "date": "2023-09-01", "description": "Rent payment for studio apartment."}'
'{"amount": 14.99, "category": "Subscription/Entertainment", "date": "2023-09-07", "description": "Monthly streaming service subscription renewal."}'
'{"amount": 65.00, "category": "Healthcare", "date": "2023-09-10", "description": "Copay for annual physical check-up."}'
'{"amount": 38.25, "category": "Groceries", "date": "2023-09-08", "description": "Mid-week grocery run for perishables."}'
'{"amount": 85.75, "category": "Transportation/Car Maintenance", "date": "2023-09-11", "description": "Oil change and tire rotation service."}'
'{"amount": 29.99, "category": "Subscription/Entertainment", "date": "2023-09-15", "description": "Purchased a new e-book for leisure reading."}'
'{"amount": 280.00, "category": "Rent/Utilities", "date": "2023-09-02", "description": "Monthly rent for shared two-bedroom apartment."}'
'{"amount": 18.50, "category": "Transportation", "date": "2023-09-09", "description": "Rideshare to airport for business trip."}'
'{"amount": 82.30, "category": "Rent/Utilities", "date": "2023-09-05", "description": "Water and electricity bill for the month."}'
'{"amount": 135.00, "category": "Shopping/Entertainment", "date": "2023-09-04", "description": "Purchased tickets for an upcoming music festival."}'
'{"amount": 58.75, "category": "Healthcare", "date": "2023-09-12", "description": "Pharmacy run for over-the-counter medications."}'
'{"amount": 22.99, "category": "Subscription/Utilities", "date": "2023-09-06", "description": "Monthly fee for cloud storage service."}'
'{"amount": 95.50, "category": "Dining/Entertainment", "date": "2023-09-16", "description": "Dinner and drinks with friends at a new bistro."}'
'{"amount": 199.99, "category": "Shopping", "date": "2023-09-13", "description": "Bought a new winter coat on sale."}'
'{"amount": 42.00, "category": "Dining", "date": "2023-09-14", "description": "Team lunch at a local deli after a successful project."}'
'{"amount": 11.99, "category": "Subscription/Utilities", "date": "2023-09-08", "description": "Monthly fee for password manager software."}'
'{"amount": 75.00, "category": "Healthcare", "date": "2023-09-17", "description": "Copay for specialist consultation."}'
'{"amount": 17.99, "category": "Subscription/Entertainment", "date": "2023-09-09", "description": "Renewed subscription for online learning platform."}'
'{"amount": 31.50, "category": "Groceries", "date": "2023-09-18", "description": "Quick shop for dinner ingredients and snacks."}'
'{"amount": 125.00, "category": "Rent/Utilities", "date": "2023-09-03", "description": "Contribution to shared household expenses."}'
'{"amount": 28.75, "category": "Dining", "date": "2023-09-19", "description": "Quick lunch at a food truck festival downtown."}'
'{"amount": 55.00, "category": "Transportation/Car Maintenance", "date": "2023-09-20", "description": "Filled up gas tank before weekend road trip."}'
'{"amount": 195.00, "category": "Rent/Utilities", "date": "2023-09-04", "description": "Monthly rent for a small studio in the city center."}'
'{"amount": 89.99, "category": "Shopping", "date": "2023-09-21", "description": "Purchased a portable charger and phone case."}'
'{"amount": 21.50, "category": "Dining/Entertainment", "date": "2023-09-22", "description": "Afternoon tea and pastries at a quaint café."}'
)

# Loop through each expense and make the API call
for expense in "${expenses[@]}"; do
  curl -X POST "$URL" -H "Content-Type: application/json" -d "$expense"
  echo "Inserted: $expense"
done
