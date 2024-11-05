// src/components/ProductManagement.js
import React, { useState } from 'react';

const ProductManagement = ({ products, setProducts }) => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or Update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      // Add new product
      const newProduct = {
        id: Date.now(), // Simple unique ID
        name: form.name,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity)
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === form.id ? { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) } : product
      );
      setProducts(updatedProducts);
    }
    // Reset form
    setForm({ id: null, name: '', description: '', category: '', price: '', quantity: '' });
  };

  // Edit product
  const handleEdit = (product) => {
    setForm(product);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div classname="pro">
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{form.id === null ? 'Add Product' : 'Update Product'}</button>
      </form>

      <h3 className='p'>Product List</h3>
      <table class='styled-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
               <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td className='actions'>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;