import React from "react";
import { Card, Tooltip } from "antd";
import {
  UnorderedListOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import orderManager from "../../modules/orderManager";
import orderProductManager from "../../modules/orderProductManager";

const { Meta } = Card;

const ProductCard = ({ productObj, routerProps, orders, setOrders }) => {
  const isLoggedIn = sessionStorage.getItem("token");

  const addToCart = () => {
    // filter out just the single open order from all the users orders
    const openOrder = orders.filter(order => order.payment_type === null)
  
    // if there is already an open order, add the product to that order
    if (openOrder.length === 1) {
      const newOrderProduct = {
        "order_id": openOrder[0].id,
        "product_id": productObj.id
      }
  
      orderProductManager.createOrderProduct(newOrderProduct).then(() => {
        window.alert(`${productObj.title} was added to your cart`)
      })
    } else {
      //if there is not already an open order, open a new order and then add the product to that new order
      const newOrderProduct = {
        "product_id": productObj.id
      }
  
      orderManager.createOrder().then(orderData => {
        newOrderProduct.order_id = orderData.id
        orderProductManager.createOrderProduct(newOrderProduct)
        .then(setOrders([orderData]))
        .then(() => {
          window.alert(`${productObj.title} was added to your cart`)
        })
      })
    }
  }

  function routePath() {
    window.location = `/buy/${productObj.id}`;
  }

  function goToLogin() {
    window.location = "/login";
  }

  const checkQuantityIsPositive = (product) => {
    if (product.quantity > 0) {
      return true
    } else {
      return false
    }
  }

  const checkQuantity = (int) => {
    if (int > 0) {
      return <Tooltip placement="right" title="Add to Cart">
      {isLoggedIn ? (
        <ShoppingCartOutlined className="clickable" key="addToCart" onClick={addToCart}/>
      ) : (
        <ShoppingCartOutlined
          className="clickable"
          key="login"
          onClick={goToLogin}
        />
      )}
    </Tooltip> } else {return <p><em>Sold out</em></p>}
  }

  return (
    <Card
      className="productCard"
      cover={
        <img
          className="clickable"
          onClick={routePath}
          alt="product"
          src={productObj.image_path}
        />
      }
      actions={[
        <Tooltip placement="left" title="Details">
          <UnorderedListOutlined
            className="clickable"
            key="details"
            onClick={routePath}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Contact Seller">
          <MailOutlined className="clickable" key="contact" />
        </Tooltip>,
        checkQuantity(productObj.quantity)
      ]}
    >
      <Meta
        title={productObj.title}
        description={`${productObj.product_type.name} ${
          productObj.location !== "none" ? `in ${productObj.location}` : ""
        }      $${productObj.price}           Quantity: ${productObj.quantity}`}
      />
    </Card>
  );
};

export default ProductCard;
