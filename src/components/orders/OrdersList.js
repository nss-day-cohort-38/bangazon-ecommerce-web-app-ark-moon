import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import orderProductManager from '../../modules/orderProductManager';
import orderManager from '../../modules/orderManager';
import productManager from '../../modules/productManager';

const OrdersList = (routerProps) => {
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
        orderManager.getUserOrders().then(orders => {
            setOrders(orders)
            const openOrder = orders.filter(order => order.payment_type === null)
            setOpenOrder(openOrder)
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

    if (openOrder.length === 0) {
        return (
            <>
                <button type="button" onClick={() => props.history.push("/buy")}>Browse Products</button>
                <button type="button" onClick={() => props.history.push("/cart")}>Back to My Cart</button>
                <button type="button" onClick={() => props.history.push("/pastorders")}>View Past Orders</button>
                <h1>Current Open Order:</h1>
                <div>
                    <h3>You have not started an order yet. Browse products and add them to your cart.</h3>
                </div>
            </>
        )
    } else {
        return (
            <>
                <button type="button" onClick={() => props.history.push("/buy")}>Browse Products</button>
                <button type="button" onClick={() => props.history.push("/cart")}>Back to My Cart</button>
                <button type="button" onClick={() => props.history.push("/pastorders")}>View Past Orders</button>
                <h1>Current Open Order:</h1>
                <div>
                    {shoppingCart.map(shoppingCart =>
                        <OrderCard
                            key={shoppingCart.id}
                            shoppingCart={shoppingCart}
                            {...routerProps}
                        />
                    )}
                </div>
                <button type="button">Complete Order</button>
                <button type="button">Cancel Order</button>
            </>
        )
    }
};

export default OrdersList;