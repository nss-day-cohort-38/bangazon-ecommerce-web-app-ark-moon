const baseUrl = "http://127.0.0.1:8000"

const PaymentTypeManager = {
    getPaymentListByCustomer() {
         return fetch(`${baseUrl}/paymenttypes`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        }).then((resp) => resp.json())
    },
    addNewPaymentType(newPaymentType) {
        return fetch(`${baseUrl}/paymenttypes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(newPaymentType)
        }).then(resp => resp.json())
    },
    deletePaymentType(id) {
        return fetch(`${baseUrl}/paymenttypes/${id}`, {
            method: "DELETE"
        });
    }
}

export default PaymentTypeManager