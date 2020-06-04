import React from 'react';

const PastOrdersList = (routerProps) => {
    const props = routerProps.routerProps

    return (
        <>
        <button type="button" onClick={() => props.history.push("/buy")}>Browse Products</button>
        <button type="button" onClick={() => props.history.push("/cart")}>Back to My Cart</button>
        <button type="button" onClick={() => props.history.push("/currentorder")}>Back to Current Order</button>
        <h1>Past Orders:</h1>
        <h3>You have no past orders.</h3>
        </>
    )
};

export default PastOrdersList;