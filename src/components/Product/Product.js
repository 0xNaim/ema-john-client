import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Product.css";

const Product = (props) => {
  const { img, name, price, seller, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h3>
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <p>
          <small>By {seller}</small>
        </p>
        <h3>${price}</h3>
        <p>
          <small>Only {stock} left in stock</small>
        </p>
        {props.showAddToCart && (
          <button className="myBtn" onClick={() => props.handleAddProduct(props.product)}>
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
