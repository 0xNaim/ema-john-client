import React from 'react';

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch('http://localhost:4000/addProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
      }}
    >
      <form action=''>
        <p>
          <span>Name: </span>
          <input type='text' placeholder='Product Name' />
        </p>
        <p>
          <span>Price: </span>
          <input type='text' placeholder='Product Price' />
        </p>
        <p>
          <span>Quantity: </span>
          <input type='text' placeholder='Product Quantity' />
        </p>
        <p>
          <span>Product Image: </span>
          <input type='file' />
        </p>
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
