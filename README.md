# Expense Tracker Application

The Expense Tracker Application is a web-based tool designed to help users manage their expenses effectively. Built with ReactJS for the front end and Spring Boot for the backend, this application provides a clean, modern interface for tracking and analyzing personal finances.

## Features

### Responsive Design

- **Cards Layout**: Features are displayed in separate, side-by-side cards for an organized and space-efficient design.
- **Light and Dark Modes**: The application supports both light and dark themes for improved user experience.

### Dashboard Overview

- **Expense Summary**: Provides a snapshot of your total spending, number of expenses, and the highest spending category.
- **Monthly Expenses**: Displays a breakdown of expenses by month.
- **Recent Expenses**: Lists the most recent expenses, showing the date, description, and amount.
- **Top 3 Expenses**: Highlights the three largest expenses.

![image](https://github.com/user-attachments/assets/2dda7dd5-45cf-49f8-be43-85b99cbf4911)
![Dashboard Overview](https://github.com/user-attachments/assets/69884fd1-7552-4bb4-be0d-426fcfee223f)

### Expense Tracking

- **Add Expense**: Users can input new expenses including description, amount, date, and category.
- **View Expenses**: Access a comprehensive list of all tracked expenses in a paginated way. You can also filter by date or category.

![image](https://github.com/user-attachments/assets/587c9fda-5911-400d-beb3-f69a635ef6c9)

- **Pagination**

![image](https://github.com/user-attachments/assets/5b17d1b2-8d19-49b7-a176-cd9c9464dfaf)
- **Filter by category**

![image](https://github.com/user-attachments/assets/5c6789d3-c183-44bf-8cba-3494ffd1c508)
- **Filter by date range**

![image](https://github.com/user-attachments/assets/42b417cf-5541-42c1-a04e-af624fc77061)


### Visualizations

- **Charts**: Visual representations of expense data in categorical, yearly, monthly, and daily formats. The graphs are scrollable and zoomable.
![image](https://github.com/user-attachments/assets/00f501f8-03a6-4871-b968-f5c90a39b8f6)
![image](https://github.com/user-attachments/assets/3f2049ad-b2b2-45fb-ab48-e8556a07574d)
![image](https://github.com/user-attachments/assets/8c3ebfd0-41f3-4f1e-9cd5-9109c35c7c71)
![image](https://github.com/user-attachments/assets/e7b442a6-d39e-4276-8536-56f4bc54e1f1)

### Data Management

- **Backend Integration**: Fetches and manages expense data from a Spring Boot backend API.
- **Database**: Uses PostgreSQL for data storage, ensuring reliability and scalability.


## Installation

### Front-end

1. **Navigate to the Front-end Directory**
   ```bash
   cd expense-tracker
   ```

2. **Install Dependencies Using npm**
   ```bash
   npm install
   ```

3. **Start the Front-end Application**
   ```bash
   npm start
   ```

### Back-end

1. **Navigate to the Back-end Directory**
   ```bash
   cd expense-tracker-backend
   ```

2. **Install Dependencies Using Maven**
   ```bash
   mvn install
   ```

3. **Run the Back-end Application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the Application**
   Open `http://localhost:3000` in your web browser to start using the Expense Tracker Application.


You need to have PostgresSQL setup and running in your pc too for this to work

