const baseUrl = "http://127.0.0.1:8000";

const productAPI = {
  getProducts() {
    return fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  },
  getProductTypes() {
    return fetch(`${baseUrl}/product-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  },
  async getProductList() {
    const resp = await fetch(`${baseUrl}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });
    return await resp.json();
  },
  async getProductDetail(productId) {
    const resp = await fetch(`${baseUrl}products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });
    return await resp.json();
  },
};

export default productAPI;
