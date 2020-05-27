import React from "react";
import { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import "./ProductList.css";

const ProductDetail = (routerProps) => {
  const productId = routerProps.productId;
  const props = routerProps.routerProps;
  console.log(routerProps);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const getProductDetail = async () => {
      const getDetailsForProduct = await productManager.getProductDetail(
        productId
      );
      setProductDetails(getDetailsForProduct);
    };
    getProductDetail();
  }, []);
  return (
      <>
          <div></div>
      <h1>{productDetails.title}</h1>
      <ul>
        <li>Price: ${productDetails.price}</li>
        <li>Description: {productDetails.description}</li>
        <li>Quantity Left In Stock: {productDetails.quantity}</li>
        <li>Location: {productDetails.location}</li>
        <li>Created At: {productDetails.created_at}</li>
      </ul>
      <button
        className="product_detail_back_btn"
        onClick={() => props.history.push("/")}
      >
        Back
      </button>
    </>
  );
};

export default ProductDetail;
