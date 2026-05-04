# 🚀 Expense Manager - 6 Jar Financial Assistant

[![GitHub license](https://img.shields.io/github/license/Nissanbarua/expense_manager)](https://github.com/Nissanbarua/expense_manager/blob/main/LICENSE)
[![React Version](https://img.shields.io/badge/react-v18%2B-blue)](https://react.dev/)
[![Node Version](https://img.shields.io/badge/node-v18%2B-green)](https://nodejs.org/)
[![Premium UI](https://img.shields.io/badge/UI-Premium-gold)](#)

**Expense Manager** is a premium, full-stack personal finance PWA designed to help middle-class families manage their monthly salary, household expenses, loans, and savings using the proven **6 Jar Money Management System**.

---

## ✨ Key Features

- **🎯 6-Jar System**: Automated salary distribution into Necessities, Education, Savings, Play, Financial Freedom, and Give jars.
- **📊 Real-time Dashboard**: Glassmorphic widgets showing daily spending limits, safety status, and monthly progress.
- **💸 Expense Tracking**: Easy-to-use transaction logging with automatic jar balance updates and history.
- **🏦 Loan Manager**: Comprehensive debt tracking, EMI schedules, and payoff progress visualization.
- **📱 PWA Ready**: Installable on mobile devices for a native-app experience with offline support.
- **🛡️ Secure Auth**: JWT-based authentication with automated Super Admin seeding.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 + Lucide Icons
- **State Management**: Zustand + React Query (Server State)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js + Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Security**: JWT + BcryptJS + Helmet
- **Logging**: Morgan

---

## 📸 Screen Shots

| Dashboard Overview | Loan Manager |
| :---: | :---: |
| ![Dashboard](https://placehold.co/600x400/1B4F72/white?text=Premium+Dashboard) | ![Loans](https://placehold.co/600x400/27AE60/white?text=Loan+Manager) |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Nissanbarua/expense_manager.git
cd expense_manager
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env and add MONGODB_URI & JWT_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
# Create .env and add VITE_API_URL
npm run dev
```

---

## 📂 Project Structure

```text
/expense-manager
├── /client           # React frontend
│   ├── /src/pages    # Application views
│   ├── /src/store    # Zustand global state
│   └── /src/api      # Axios configuration
└── /server           # Node.js backend
    ├── /src/models   # Mongoose schemas
    ├── /src/routes   # API endpoints
    └── /src/utils    # Helper functions
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to improve the Expense Manager.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [Nissan Barua](https://github.com/Nissanbarua)
