import React from 'react';

const OrderCard = (routerProps) => {
    return (
        <div className='orderListItem'>
            <h3>{routerProps.shoppingCart.product.title}</h3>
            <div>
            <p>${routerProps.shoppingCart.product.price}</p>
            <p>Quantity: 1</p>
            </div>
        </div>
    )
};

export default OrderCard;