import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetail from "./products/ProductDetail";
import ProductsMain from "./buy/Products";

const BodyRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routerProps) => {
          return <HomePage routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/login"
        render={(routerProps) => {
          return <Login routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/register"
        render={(routerProps) => {
          return <Register routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/products/:productId(\d+)"
        render={(routerProps) => {
          return (
            <ProductDetail
              productId={parseInt(routerProps.match.params.productId)}
              routerProps={routerProps}
            />
          );
        }}
      />
      <Route
        exact
        path="/buy"
        render={(routerProps) => {
          return <ProductsMain routerProps={routerProps} />;
        }}
      />
    </Switch>
  );
};

export default BodyRouter;
