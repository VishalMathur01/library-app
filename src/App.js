import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import UserReports from './pages/UserReports';
import UserTransactions from './pages/UserTransactions';
import BookAvailability from './pages/BookAvailability';
import TransactionCancelled from './pages/TransactionCancelled';
// import Header from './components/Header';

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Admin Pages */}
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/book-availability" element={<BookAvailability />} />

        {/* User Pages */}
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/user-reports" element={<UserReports />} />
        <Route path="/user-transactions" element={<UserTransactions />} />

        {/* Shared Pages */}
        <Route path="/transaction-cancelled" element={<TransactionCancelled />} />

        {/* Redirect Unauthorized Users */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;