const orderBaseUrl = "http://localhost:8000/orders";

const orderManager = {
    getUserOrders() {
        return fetch(orderBaseUrl, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
    },
    createOrder() {
        return fetch(orderBaseUrl, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            },
        })
        .then(resp => resp.json())
    },
    updateOrder(updatedOrder) {
        return fetch(`${orderBaseUrl}/${updatedOrder.id}`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            },
            "body": JSON.stringify(updatedOrder)
        })
    },
    deleteOrder(orderId) {
        return fetch(`${orderBaseUrl}/${orderId}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
        
    }
};

export default orderManager;