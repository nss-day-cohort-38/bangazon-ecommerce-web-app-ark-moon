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
    const [total, setTotal] = useState([]);

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
                    // add the price of each product to the order total
                    let orderTotal = 0
                    products.forEach(product => orderTotal += parseInt(product.product.price))
                    setTotal(orderTotal.toFixed(2))
                })
            } 
        })
    }
    
    const cancelOrder = () => { 
     
    shoppingCart.forEach(item => {
        orderProductManager.deleteOrderProduct(item.id)
        .then(window.alert("You have successfully cancelled your order!"))
        .then(props.history.push("/buy"))
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
                <button type="button" onClick={() => props.history.push("/buy")}>Browse More Products</button>
                <button type="button" onClick={() => props.history.push("/cart")}>Back to My Cart</button>
                <button type="button" onClick={() => props.history.push("/pastorders")}>View Past Orders</button>
                <h1>Current Open Order:</h1>
                <h2>Please verify the items in your order and then click 'complete order'.</h2>
                <div>
                    {shoppingCart.map(shoppingCart =>
                        <OrderCard
                            key={shoppingCart.id}
                            shoppingCart={shoppingCart}
                            {...routerProps}
                        />
                    )}
                </div>
                <h1>Order Total: ${total}</h1>
                <button type="button">Complete Order</button>
                <button type="button" onClick={cancelOrder}>Cancel Order</button>
            </>
        )
    }
};

export default OrdersList;