import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {	
	const { img, name, price, seller, stock, star, features } = props.product;
	return (
		<div className="product">
			<div>
				<img src={img} alt="" />
			</div>
			<div>
				<h3>
					<a href="">{name}</a>
				</h3>
				<p>
					<small>by: {seller}</small>
				</p>
				<h4>${price}</h4>
				<p>
					<small>only {stock} left in stock</small>
				</p>
				<button onClick={() => props.handleAddProduct(props.product)}>
					<FontAwesomeIcon icon={faShoppingCart} /> add to cart
				</button>
			</div>
		</div>
	);
};

export default Product;
