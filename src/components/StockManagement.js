// src/components/StockManagement.js
import React, { useState } from 'react';

const StockManagement = ({ products, setProducts }) => {
  const [transaction, setTransaction] = useState({
    productId: '',
    quantity: '',
    type: 'add', // 'add' or 'deduct'
  });

  // State to track transaction history
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Handle input change for stock transactions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Handle stock transaction submission
  const handleStockChangeSubmit = (e) => {
    e.preventDefault();
    const { productId, quantity, type } = transaction;
    const quantityNum = parseInt(quantity, 10);

    // Check if the quantity is valid
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    // Check if the product exists
    const product = products.find((p) => p.id === parseInt(productId, 10));
    if (!product) {
      alert('Selected product does not exist.');
      return;
    }

    // Update the product's stock
    setProducts((prevProducts) => {
      return prevProducts.map((prod) => {
        if (prod.id === parseInt(productId, 10)) {
          const updatedQuantity = type === 'add'
            ? prod.quantity + quantityNum
            : Math.max(0, prod.quantity - quantityNum); // Prevent negative stock

          return { ...prod, quantity: updatedQuantity };
        }
        return prod;
      });
    });

    // Record the transaction
    const transactionRecord = {
      date: new Date().toLocaleString(),
      type,
      quantity: quantityNum,
      productName: product.name,
    };
    setTransactionHistory((prevHistory) => [...prevHistory, transactionRecord]);

    // Reset form
    alert(`Transaction successful: ${type === 'add' ? 'Added' : 'Deducted'} ${quantityNum} from ${product.name}.`);
    setTransaction({ productId: '', quantity: '', type: 'add' });
  };

  return (
    <div>
      <h2>Stock Management</h2>
      {products.length > 0 ? ( // Check if there are products
        <>
          <h3>Current Stock Levels</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Current Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No products available.</p> // Message if no products
      )}

      <h3>Record Stock Transactions</h3>
      <form onSubmit={handleStockChangeSubmit}>
        <select name="productId" value={transaction.productId} onChange={handleChange} required>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={transaction.quantity}
          onChange={handleChange}
          required
        />
        <select name="type" value={transaction.type} onChange={handleChange}>
          <option value="add">Add Stock</option>
          <option value="deduct">Deduct Stock</option>
        </select>
        <button type="submit">Submit Transaction</button>
      </form>

       <h3>Transaction History</h3>
      {transactionHistory.length > 0 ? (
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index}>
              {transaction.date}: {transaction.type} {transaction.quantity} of {transaction.productName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions recorded.</p>
      )}
    </div>
  );
};

export default StockManagement;