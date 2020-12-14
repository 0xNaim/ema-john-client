import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  console.log(props);
  const { name, img, quantity } = props.product;
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
          <p>Quantity: {quantity}</p>
          <br />
          <button className="myBtn">Remove Item</button>
        </div>
      </div>
      <div>
        <h3>Order Review</h3>
      </div>
    </div>
  );
};

export default ReviewItem;
