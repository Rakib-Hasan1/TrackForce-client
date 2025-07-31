# 💼 TrackForce – Employee Management Web Application

TrackForce is a full-stack, role-based employee management platform designed for modern organizations. Built using **React**, **Node.js**, **Express**, and **MongoDB**, it provides distinct dashboards and features for Employees, HRs, and Admins to manage daily tasks, salary, and personnel efficiently.

---

## 🚀 Live Website
🌐 [TrackForce Live Demo](https://trackforce-d041e.web.app/)

## Server Link
https://github.com/Rakib-Hasan1/TrackForce-server

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, React Hook Form, Framer Motion, Headless UI
- **Backend:** Express.js, MongoDB (native driver), JWT Auth
- **State & Data:** React Query (TanStack Query), Axios
- **Payment:** Stripe Integration (for Admin payments)
- **Deployment:** Vercel (back-end), Firebase (Front-end)

---

## 👥 User Roles & Access

| Role     | Access Areas                                              |
|----------|-----------------------------------------------------------|
| Employee | Work Sheet, Profile, Payment History                      |
| HR       | Employee List, Verify Employees, Create Payment Requests  |
| Admin    | Manage Users, Approve Payments, Dashboard Analytics       |

---

## 🔐 Authentication & Authorization

- JWT-based Auth
- Protected routes by roles (Admin, HR, Employee)
- Auto logout on forbidden access with **custom Forbidden screen**

---

## 📊 Dashboard Features

### 👤 Employee Dashboard
- View personal profile info
- Submit daily work via Work Sheet
- View past work and payment history

### 🧑‍💼 HR Dashboard
- View and manage all employees
- Verify employee status (✅ / ❌)
- Create salary payment requests via modal
- View total hours summary via bar chart

### 🛠️ Admin Dashboard
- Approve payment requests from HRs
- View pie chart of payment distributions
- View contact submissions
- Manage all users (Promote to HR, Remove, Change Salary)

---

## 📂 Backend API Routes

### Authentication
- `POST /jwt` → Generate JWT token
- `GET /users` → Get all users
- `POST /peoples` → Register new users

### Work
- `GET /works?email=...` → Fetch user's work data
- `POST /works` → Add work
- `PATCH /works/:id` → Update work
- `DELETE /works/:id` → Delete work
- `GET /works/summary` → Total hours grouped by employee

### Payments
- `POST /payment-requests` → Create payment (HR)
- `PATCH /payment-requests/:id/pay` → Mark as paid (Admin)
- `GET /payment-history?email=...` → Get employee salary history
- `GET /payroll` → Admin payment request list

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trackforce.git
   cd trackforce
