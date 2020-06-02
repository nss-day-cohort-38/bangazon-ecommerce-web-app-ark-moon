import React from "react";
import { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
// import "./ProductList.css";

const ProductDetail = (routerProps) => {
  const productId = routerProps.productId;
  const props = routerProps.routerProps;

  const [productDetails, setProductDetails] = useState({});
  const [order, setOrder] = useState({
    created_at: "",
    customer_id: "",
    payment_type_id: "",
  });

  const isLoggedIn = sessionStorage.getItem("token");

  // Fetch all the order first....
  const newOrder = {
    created_at: order.created_at,
    customer_id: order.customer_id,
    payment_type_id: order.payment_type_id,
  };

  const addToCart = async () => {
    try {
      const updateCart = await productManager.addProductToCart(
        productId,
        newOrder
      );
      setOrder(updateCart);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getProductDetail = async () => {
      const getDetailsForProduct = await productManager.getProductDetail(
        productId
      );
      setProductDetails(getDetailsForProduct);
    };
    getProductDetail();
  }, []);

  const dateFormatter = (dateString) => {
    return dateString.split("T")[0];
  };

  return (
    <>
      <div className="detailsItem">
        <img className="detailsImage" src={productDetails.image_path} />
        <h1>{productDetails.title}</h1>
        {isLoggedIn ? (
          <button className="buy_product" onClick={addToCart}>
            Add To Cart
          </button>
        ) : null}
        <ul>
          <li>Price: ${productDetails.price}</li>
          <li>Description: {productDetails.description}</li>
          <li>Quantity Left In Stock: {productDetails.quantity}</li>
          {productDetails.location !== "none" ? (
            <li>Location: {productDetails.location}</li>
          ) : null}
          {productDetails.created_at ? (
            <li>Posted on {dateFormatter(productDetails.created_at)}</li>
          ) : null}
        </ul>
        <button
          className="product_detail_back_btn"
          onClick={() => props.history.push("/buy")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
