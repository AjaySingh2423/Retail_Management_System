# Retail Management & Billing System (MERN Stack)

## Overview

The Retail Management & Billing System is a full-stack web application developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)** to simplify and automate the daily operations of retail shops. It provides a secure platform for shopkeepers to manage products, customers, inventory, billing, and purchase history from a single dashboard.

The application allows shopkeepers to add and update products, maintain inventory, register customers, generate professional PDF invoices, automatically calculate totals, track purchase history, and maintain customer billing records. It also provides sales analytics, profit tracking, low-stock alerts, product expiry monitoring, and automatic invoice delivery via email.

The project demonstrates practical implementation of full-stack web development, REST APIs, authentication, database management, and real-time business analytics.

---

# Features

## Authentication

- Shopkeeper Registration
- Secure Login
- JWT Authentication using Cookies
- Password Hashing using bcrypt
- Logout

---

## Dashboard

- Total Products
- Total Customers
- Current Stock Value
- Profit in Last 24 Hours
- Low Stock Products
- Products Expiring Within 10 Days
- Monthly Sales Graph
- Monthly Profit Graph

---

## Product Management

- Add New Products
- Automatic Stock Update for Existing Products
- Unique Product ID Generation
- Edit Product Details
- Delete Products
- Product Search
- Product Table

---

## Customer Management

- Register Customers
- Delete Customers
- Search Customers
- Customer Table

---

## Billing System

- Product Search
- Automatic Bill Number Generation
- Customer Validation
- Quantity Validation
- Out-of-Stock Validation
- Automatic Stock Deduction After Billing
- Bill Storage in Database

---

## Invoice Generation

- Professional PDF Invoice
- Shop Name
- Shop Address
- Shopkeeper Email
- Bill Number
- Customer Name
- Customer Email
- Billing Date
- Product Details
- Grand Total
- Download Invoice PDF
- Automatic Invoice Email Delivery using Nodemailer

---

## Purchase History

- Stores Every Product Purchase
- Search by Product ID
- Search by Product Name
- Search by Supplier
- Purchase History Table

---

## Customer Bill History

Search Bills By:

- Customer Email
- Bill Number

Features:

- Total Bills
- Total Purchase Value
- Total Purchased Items
- Bill Details
- Product-wise Invoice History

---

# Technologies Used

## Frontend

- React.js
- React Router DOM
- Axios
- jsPDF
- jspdf-autotable
- Recharts
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Nodemailer
- bcrypt

---

# Project Structure

```text
Retail-Management-System/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── connection.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── README.md
```

---

# Database Collections

```text
shop
│
├── coustomer_bills
├── coustomer_infos
├── products
├── purchasehistories
└── user_infos
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/retail-management-system.git
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

EMAIL=your_email@gmail.com

EMAIL_PASSWORD=your_google_app_password
```

> ## Important Security Note
>
> This project automatically sends PDF invoices to customers using **Nodemailer** after successful billing.
>
> For security reasons, the **Gmail address** and **Google App Password** used for email delivery are **not included** in this repository.
>
> To enable the email functionality:
>
> 1. Use your own Gmail account.
> 2. Enable **2-Step Verification**.
> 3. Generate a **Google App Password**.
> 4. Add your credentials to the `.env` file as shown above.
>
> Without these credentials, the application will function normally, but **automatic invoice email delivery will be disabled**.

---

# Run Backend

```bash
npm start
```

---

# Run Frontend

```bash
npm run dev
```

---

# Screenshots

Add screenshots of the application inside a `screenshots` folder.

Suggested screenshots:

- Login Page
- Registration Page
- Dashboard
- Product Management
- Customer Management
- Billing Page
- Invoice PDF
- Purchase History
- Customer Bill History
- Analytics Dashboard
- Profile Page

---

# Future Improvements

- Barcode Scanner Integration
- GST Calculation
- QR Code on Invoice
- Sales Prediction using Machine Learning
- Multiple Shop Branch Support
- Supplier Management
- Daily Sales Reports
- Backup & Restore
- Admin Panel
- Mobile Application

---

# Author

**Ajay Singh**

MCA Passout

Graphic Era Hill University

GitHub: https://github.com/AjaySingh2423

---

# License

This project is developed for educational and learning purposes only.