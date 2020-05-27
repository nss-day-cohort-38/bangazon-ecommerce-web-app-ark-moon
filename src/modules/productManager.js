const baseUrl = "http://127.0.0.1:8000"

const productAPI= {
    getProducts(){
        return fetch(`${baseUrl}/products`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify()
        }).then(resp=>resp.json())
    },
    getProductTypes(){
        return fetch(`${baseUrl}/product-types`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify()
        }).then(resp=>resp.json())
    }, 
    postSellableProduct(){
        return fetch(`${baseUrl}/sell`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": "Token "
            }, 
            body: JSON.stringify()
        }).then(resp=>resp.json())
    }
}

export default productAPI;