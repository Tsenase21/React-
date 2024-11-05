import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProductManagement from './components/ProductManagement';
import StockManagement from './components/StockManagement';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import Login from './Login'; 
import './App.css'; 
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const onLogin = () => {
    setIsAuthenticated(true); // Set authenticated state to true on successful login
  };

  const onLogout = () => {
    setIsAuthenticated(false); // Set authenticated state to false on logout
  };

  return (
    <Router>
      <div className="container">
        <h1>Wings Cafe Inventory System</h1>
        {isAuthenticated ? (
          <>
            <nav>
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/products">Product Management</Link></li>
                <li><Link to="/stock">Stock Management</Link></li>
                <li><Link to="/users">User Management</Link></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </ul>
            </nav>
            
            <Routes>
              <Route path="/dashboard" element={<Dashboard products={products} transactions={transactions} />} />
              <Route path="/products" element={<ProductManagement products={products} setProducts={setProducts} />} />
              <Route path="/stock" element={<StockManagement products={products} setProducts={setProducts} transactions={transactions} setTransactions={setTransactions} />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={onLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
