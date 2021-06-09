import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://ancient-river-47648.herokuapp.com/productsByKeys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  let thankYou;
  if (orderPlaced) {
    // thankYou = <img src={happyImg} alt="" />;
    thankYou = <h2>Congratulations! Your order has been placed.</h2>;
  }
  return (
    <div className='twin-container'>
      <div className='product-container'>
        {cart.map((pd) => (
          <ReviewItem
            product={pd}
            key={pd.key}
            removeProduct={removeProduct}
          ></ReviewItem>
        ))}

        {thankYou}
      </div>

      <div className='cart-container'>
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className='myBtn'>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
