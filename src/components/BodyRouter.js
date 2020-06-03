import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetail from "./buy/ProductDetail";
import ProductsMain from "./buy/Products";
import Profile from "./userProfile/Profile";
import Sell from "./sell/Sell";
import ShoppingCartList from "./orders/ShoppingCartList";
import PaymentTypeForm from "./userProfile/PaymentTypeForm";
import OrdersList from "./orders/OrdersList";
import PastOrdersList from "./orders/PastOrdersList";

const BodyRouter = (props) => {
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
        path="/buy/:productId(\d+)"
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
          return <ProductsMain routerProps={routerProps} locationBoolean={props.locationBoolean} searchTerm={props.searchTerm} changeSearchTerm={props.changeSearchTerm}/>;
        }}
      />
      <Route
        exact
        path="/sell"
        render={(routerProps) => {
          if (sessionStorage.getItem("token")) {
            return <Sell routerProps={routerProps} />;
          } else {
            return <Login routerProps={routerProps} />;
          }
        }}
      />
      <Route
        exact
        path="/myprofile"
        render={(routerProps) => {
          return <Profile routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/newpayment"
        render={(routerProps) => {
          return <PaymentTypeForm routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/cart"
        render={(routerProps) => {
        return <ShoppingCartList routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/currentorder"
        render={(routerProps) => {
        return <OrdersList routerProps={routerProps} />;
        }}
      />
      <Route
        exact
        path="/pastorders"
        render={(routerProps) => {
        return <PastOrdersList routerProps={routerProps} />;
        }}
      />
    </Switch>
  );
};

export default BodyRouter;
