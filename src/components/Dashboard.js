import React, { useState } from 'react';

const Dashboard = ({
  products,
  transactions,
  onAddProduct,
  onAdjustStock,
  onViewReports,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const totalStock = products.reduce((total, product) => total + product.quantity, 0);
  const lowStockItems = products.filter((product) => product.quantity < product.minRequired).length;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Stock Management Dashboard</h2>
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="dashboard-content">
        <div className="stock-summary">
          <div className="summary-card">
            <h3>Total Stock</h3>
            <p>{totalStock}</p>
          </div>
          <div className="summary-card">
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
          <div className="summary-card">
            <h3>Low Stock Items</h3>
            <p>{lowStockItems}</p>
          </div>
        </div>

        <div className="dash">
          <h3>Current Stock Levels</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Current Quantity</th>
                <th>Min Required</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  style={{ backgroundColor: product.quantity < product.minRequired ? '#ffcccc' : '#ffffff' }}
                >
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.minRequired}</td>
                  <td>{product.quantity < product.minRequired ? 'Low Stock' : 'In Stock'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recent-transactions">
          <h3>Recent Transactions</h3>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>
                  {transaction.date}: {transaction.type} {transaction.quantity} of {transaction.productName} by {transaction.user}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent transactions.</p>
          )}
        </div>

        <div className="alerts">
          <h3>Alerts</h3>
          {lowStockItems > 0 ? (
            <p>{lowStockItems} products are low on stock!</p>
          ) : (
            <p>All products are adequately stocked.</p>
          )}
        </div>

        <div className="quick-actions">
          <button onClick={onAddProduct}>Add Product</button>
          <button onClick={onAdjustStock}>Adjust Stock</button>
          <button onClick={onViewReports}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
