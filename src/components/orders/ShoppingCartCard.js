import React from 'react';

const ShoppingCartCard = (routerProps) => {
    return (
        <div>
            <h3>{routerProps.shoppingCart.product.title}</h3>
            <p>${routerProps.shoppingCart.product.price}</p>
            <p>Quantity: {routerProps.shoppingCart.product.quantity}</p>
            <button type="button">Remove From Cart</button>
        </div>
    )
};

export default ShoppingCartCard;