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
    deleteOrder(orderId) {
        return fetch(`${orderBaseUrl}/${orderId}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
    }
};

export default orderManager;