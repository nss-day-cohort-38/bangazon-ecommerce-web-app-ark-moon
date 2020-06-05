import React, { useState, useEffect } from 'react';
import orderProductManager from '../../modules/orderProductManager';
import orderManager from '../../modules/orderManager';
import productManager from '../../modules/productManager';
import ShoppingCartCard from './ShoppingCartCard';


const ShoppingCartList = (routerProps) => {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openOrder, setOpenOrder] = useState({});
    const [products, setProducts] = useState([]);

    const props = routerProps.routerProps;

    const getProducts = () => {
        productManager.getProducts().then(products => {
            setProducts(products)
        })
    }

    const getShoppingCartProducts = () => {
        // get all of the users orders
        orderManager.getUserOrders().then(orders => {
            setOrders(orders)
            // filter out just the single open order
            const openOrder = orders.filter(order => order.payment_type === null)
            setOpenOrder(openOrder)
            // if there is an open order, get the products associated with that order
            if (openOrder.length !== 0) {
                orderProductManager.getOrderProductsByOrder(openOrder[0].id).then(products => {
                    setShoppingCart(products)
                })
            }
        })
    }

    useEffect(() => {
        getShoppingCartProducts();
        getProducts();
    }, []);
    
    if (openOrder.length === 0 || shoppingCart.length === 0) {
        return (
            <>
                <h1>Shopping Cart:</h1>
                <div>
                    <h3>You have no items in your cart</h3>
                    <button className="clickable" type="button" onClick={() => props.history.push("/buy")}>Browse Products</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <button className="clickable" type="button" onClick={() => props.history.push("/buy")}>Browse More Products</button>
                <h1>Shopping Cart:</h1>
                <div class='cartItemsContainer'>
                    {shoppingCart.map(shoppingCart =>
                        <ShoppingCartCard
                            key={shoppingCart.id}
                            shoppingCart={shoppingCart}
                            {...routerProps}
                        />
                    )}
                </div>
                <button className="clickable" type="button" onClick={() => props.history.push("/currentorder")}>Review Order</button>
            </>
        )
    }
};

export default ShoppingCartList;