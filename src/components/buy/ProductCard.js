import React from "react";
import { Card, Tooltip } from "antd";
import {
  UnorderedListOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ productObj, routerProps }) => {
  const isLoggedIn = sessionStorage.getItem("token");

  function routePath() {
    window.location = `/buy/${productObj.id}`;
  }

  function goToLogin() {
    window.location = "/login"
  }

  return (
    <Card
      onClick={() => routerProps.history.push(`products/${productObj.id}`)}
      className="productCard"
      cover={
        <img
          className="clickable"
          onClick={routePath}
          alt="product image"
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

        <Tooltip placement="right" title="Add to Cart">
          {isLoggedIn ? (
            <ShoppingCartOutlined className="clickable" key="addToCart" />
          ) : <ShoppingCartOutlined className="clickable" key="login" onClick={goToLogin} />}
        </Tooltip>,
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
