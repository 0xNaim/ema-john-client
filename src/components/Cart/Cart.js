import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Cart.css'

const Cart = (props) => {
  const cart = props.cart;
  // const total = cart.reduce( (total, prd) => total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }
  // shipping
  let shipping = 0;
  if (total > 120) {
    shipping = 4.99;
  } else if (total > 60) {
    shipping = 8.99;
  } else if (total > 0) {
    shipping = 10;
  }
  // tax
  let tax = (total * 5) / 100;

  const formateNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision);
  }

  return (
    <div className='cart'>
      <div className='cart-title'>
        <h3>Order Summary</h3>
        <p>Items Added: {cart.length}</p>
      </div>
      <p>Product Price: ${formateNumber(total)}</p>
      <p>Shipping Cost: ${formateNumber(shipping)}</p>
      <p>Tax + VAT: ${formateNumber(tax)}</p>
      <p>Total Price: ${formateNumber(total + shipping + tax)}</p>
      <Link to="/review"><button className="myBtn">Review Order</button></Link>
    </div>
  );
};

export default Cart;
