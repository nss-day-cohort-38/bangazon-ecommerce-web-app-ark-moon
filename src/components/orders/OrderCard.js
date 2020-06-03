import React from 'react';

const OrderCard = (routerProps) => {
    return (
        <div>
            <h3>{routerProps.shoppingCart.product.title}</h3>
            <p>${routerProps.shoppingCart.product.price}</p>
            <p>Quantity: {routerProps.shoppingCart.product.quantity}</p>
        </div>
    )
};

export default OrderCard;