import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { name, seller, price, img, quantity, key } = props.product;
  const removeProduct = props.removeProduct;
  return (
    <div className="review-item-container">
      <div className="review-item">
        <div className="reviewImg">
          <img src={img} alt="" />
        </div>
        <div>
          <h3>
            <a href="">{name}</a>
          </h3>
          <h3>${price}</h3>
          <p><small>By {seller}</small></p>
          <p>Quantity: {quantity}</p>
          <br />
          <button onClick={() => removeProduct(key)} className="myBtn">
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
