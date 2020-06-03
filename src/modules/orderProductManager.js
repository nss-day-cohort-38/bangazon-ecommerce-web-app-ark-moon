const orderProductBaseUrl = "http://localhost:8000/orderproducts";

const orderProductManager = {
    getOrderProductsByOrder(orderId) {
        return fetch(`${orderProductBaseUrl}?order_id=${orderId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
    },
    createOrderProduct(newOrderProduct) {
        return fetch(orderProductBaseUrl, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            },
            "body": JSON.stringify(newOrderProduct)
        })
        .then(resp => resp.json())
    },
    deleteOrderProduct(orderProductId) {
        return fetch(`${orderProductBaseUrl}/${orderProductId}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
    }
};

export default orderProductManager;