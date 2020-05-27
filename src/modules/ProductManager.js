const baseUrl = "http://127.0.0.1:8000/"

const ProductManager = {
    addproduct() {
        return fetch(`${baseUrl}sell`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json", 
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }, 
            body: JSON.stringify()
        }).then(resp => resp.json())
    }
}

export default ProductManager