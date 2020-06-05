import React, { useState, useEffect } from 'react';
import orderManager from '../../modules/orderManager';
import paymentTypeManager from '../../modules/paymentTypeManager';

const PaymentForm = (routerProps) => {
    // used to store all the user's orders
    const [orders, setOrders] = useState([]);
    // used to store the user's single active order
    const [openOrder, setOpenOrder] = useState([]);
    //used to store all the user's payment types
    const [paymentTypes, setPaymentTypes] = useState([]);

    const props = routerProps.routerProps;

    const handleFieldChange = evt => {
        const stateToChange = { ...openOrder[0] };
        stateToChange[evt.target.id] = evt.target.value;
        setOpenOrder(stateToChange);
    };

    const addPaymentTypeToOrder = (e) => {
        if (openOrder.payment_type_id == null) {
            alert("Please select a payment type.")
        } else {
            e.preventDefault();

            const updatedOrder = {
                "id": openOrder.id,
                "customer_id": parseInt(openOrder.customer_id),
                "payment_type_id": parseInt(openOrder.payment_type_id),
                "created_at": openOrder.created_at
            }
    
            orderManager.updateOrder(updatedOrder).then(order => {
                setOpenOrder(order)
            })
                .then(() => {
                    alert("Your order is now complete!")
                })
                .then(() => {
                    props.history.push("/currentorder")
                })
        }
    }

    const getOpenOrder = () => {
        orderManager.getUserOrders().then(orders => {
            setOrders(orders)
            // filter out just the single open order
            const openOrder = orders.filter(order => order.payment_type === null)
            setOpenOrder(openOrder)
        })
    };

    const getPaymentTypes = () => {
        paymentTypeManager.getPaymentListByCustomer().then(paymentTypes => {
            setPaymentTypes(paymentTypes)
        })
    }

    useEffect(() => {
        getOpenOrder();
        getPaymentTypes();
    }, []);

    return (
        <>
            <h1>Select Payment Type:</h1>
            <fieldset>
                <select
                    className="form-control"
                    id="payment_type_id"
                    required
                    onChange={handleFieldChange}>
                    <option value="">Select Type</option>
                    {paymentTypes.map(payment => (
                        <option key={payment.id} value={payment.id}>
                            {payment.merchant_name} {payment.account_number.slice(-4)}
                        </option>
                    ))}
                </select>
            </fieldset>
            <button type="button" onClick={addPaymentTypeToOrder}>Complete Order</button>
        </>
    )
};

export default PaymentForm;