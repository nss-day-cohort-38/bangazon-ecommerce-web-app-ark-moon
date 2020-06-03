import React from "react";
import { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import orderProductManager from "../../modules/orderProductManager";
// import "./ProductList.css";

const ProductDetail = (routerProps) => {
  const productId = routerProps.productId;
  const props = routerProps.routerProps;

  const [productDetails, setProductDetails] = useState({});
  const [orders, setOrders] = useState([]);

  const isLoggedIn = sessionStorage.getItem("token");

  const getOrders = () => {
    orderManager.getUserOrders().then(orders => {
      setOrders(orders)
    })
  }

  useEffect(() => {
    getOrders();
  }, []);

  const addToCart = () => {
    const openOrder = orders.filter(order => order.payment_type === null)

    if (openOrder.length === 1) {
      const newOrderProduct = {
        "order_id": openOrder[0].id,
        "product_id": productDetails.id
      }

      orderProductManager.createOrderProduct(newOrderProduct).then(() => {
        window.alert(`${productDetails.title} was added to your cart`)
      })
    } else {
      const newOrderProduct = {
        "product_id": productDetails.id
      }

      orderManager.createOrder().then(orderData => {
        newOrderProduct.order_id = orderData.id
        orderProductManager.createOrderProduct(newOrderProduct).then(() => {
          window.alert(`${productDetails.title} was added to your cart`)
        })
      })
    }
  }

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
