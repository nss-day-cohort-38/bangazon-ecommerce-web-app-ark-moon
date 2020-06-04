import React, { useState, useEffect } from 'react';
import orderManager from '../../modules/orderManager';

const PaymentForm = (routerProps) => {
    const [orders, setOrders] = useState([])
    const [openOrder, setOpenOrder] = useState({})
    const [paymentType, setPaymentType] = useState([])

    // const handleFieldChange = evt => {
    //     const stateToChange = { ...order };
    //     stateToChange[evt.target.id] = evt.target.value;
    //     setOrder(stateToChange);
    // };

    const getOpenOrder = () => {
        orderManager.getUserOrders().then(orders => {
            setOrders(orders)
            // filter out just the single open order
            const openOrder = orders.filter(order => order.payment_type === null)
            setOpenOrder(openOrder)
            console.log(openOrder)
        })
    };

    useEffect(() => {
        getOpenOrder();
    }, []);

    return (
        <>
            <h1>Select Payment Type</h1>
            <fieldset>
                <select
                    className="form-control"
                    id="payment_type"
                    required>
                    <option value="">Select Type</option>
                    {paymentType.map(payment => (
                        <option key={payment.id} value={payment.id}>
                            {payment.merchant_name}
                        </option>
                    ))}
                </select>
            </fieldset>
        </>
    )
};

export default PaymentForm;