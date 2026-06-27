import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Site */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Protected Dashboard Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Fallback to portfolio home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
