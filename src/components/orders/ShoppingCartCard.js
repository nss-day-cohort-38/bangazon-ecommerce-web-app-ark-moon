import React from 'react';

const ShoppingCartCard = (props) => {
    return (
        <div>
            <h3>{props.shoppingCart.product.title}</h3>
            <p>${props.shoppingCart.product.price}</p>
            <p>Quantity: {props.shoppingCart.product.quantity}</p>
            <button type="button">Remove From Cart</button>
        </div>
    )
};

export default ShoppingCartCard;