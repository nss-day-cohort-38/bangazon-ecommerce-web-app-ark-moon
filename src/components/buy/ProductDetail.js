import React from "react";
import { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
// import "./ProductList.css";

const ProductDetail = (routerProps) => {
  const productId = routerProps.productId;
  const props = routerProps.routerProps;
  const [productDetails, setProductDetails] = useState({});
  const [cart, setCart] = useState({});
  const [productObj, setProductObj] = useState({})

  const addToCart = async () => {
    try {
      const updateCart = await productManager.addProductToCart(productId);
      setCart(updateCart);
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

  return (
    <>
      <div>
      <h1>{productDetails.title}</h1>
      <button className='buy_product' onClick={addToCart}>Add To Cart</button>
      <ul>
        <li>Price: ${productDetails.price}</li>
        <li>Description: {productDetails.description}</li>
        <li>Quantity Left In Stock: {productDetails.quantity}</li>
        <li>Location: {productDetails.location}</li>
        <li>Created At: {productDetails.created_at}</li>
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
