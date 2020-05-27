const baseUrl = "http://127.0.0.1:8000/";

const AuthManager = {
  loginUser(user) {
    return fetch(`${baseUrl}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    }).then((resp) => {
      resp.json().then((resp) => {
        sessionStorage.setItem("token", resp.token);
      });
    });
  },
  registerUser(user) {
    return fetch(`${baseUrl}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    }).then((resp) =>
      resp.json().then((token) => {
        sessionStorage.setItem("token", token.token);
      })
    );
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

export default AuthManager;
