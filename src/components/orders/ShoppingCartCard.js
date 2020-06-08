import React from 'react';
import orderProductManager from "../../modules/orderProductManager";

const deleteFromCart = (product) => {
    orderProductManager.deleteOrderProduct(product.id).then(() => {
            window.location.reload()
            window.alert(`${product.title} was deleted from your cart`)
        })
}

const ShoppingCartCard = (routerProps) => {
    return (
        <div class='cartItem'>
            <div className="cartItemImage">
            <img
          alt="product"
          src={routerProps.shoppingCart.product.image_path}
            />
            </div>
            <h3>{routerProps.shoppingCart.product.title}</h3>
            <p>${routerProps.shoppingCart.product.price}</p>
            <p>Quantity: 1</p>
            <button className="clickable" type="button" onClick={() => {
                let product = routerProps.shoppingCart.product
                product.id = routerProps.shoppingCart.id
                deleteFromCart(product)
                }
            }>Remove From Cart</button>
        </div>
    )
};

export default ShoppingCartCard;