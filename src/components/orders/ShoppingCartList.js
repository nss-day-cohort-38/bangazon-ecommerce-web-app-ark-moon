import React, { useState, useEffect } from 'react';
import orderProductManager from '../../modules/orderProductManager';
import orderManager from '../../modules/orderManager';
import productManager from '../../modules/productManager';
import ShoppingCartCard from './ShoppingCartCard';


const ShoppingCartList = (props) => {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openOrder, setOpenOrder] = useState({});
    const [products, setProducts] = useState([]);

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
                <h1>Shopping Cart:</h1>
                <div>
                    <h3>You have no items in your cart</h3>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1>Shopping Cart:</h1>
                <div>
                    {shoppingCart.map(shoppingCart =>
                        <ShoppingCartCard
                            key={shoppingCart.id}
                            shoppingCart={shoppingCart}
                            {...props}
                        />
                    )}
                </div>
            </>
        )
    }
};

export default ShoppingCartList;