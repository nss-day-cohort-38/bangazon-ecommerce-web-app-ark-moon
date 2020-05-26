import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './homePage/HomePage'
import Login from './auth/Login'
import Register from './auth/Register'
import Sell from './products/Sell'

const BodyRouter = () => {
    return(
        <Switch>
                <Route exact path="/" render={routerProps => {
                    return (
                        <HomePage routerProps={routerProps} />             
                    );
                }}
                />
                <Route exact path ="/login" render={routerProps => {
                    return (
                        <Login routerProps={routerProps} />
                    );
                }}
                />
                <Route exact path ="/register" render={routerProps => {
                    return (
                        <Register routerProps={routerProps} />
                    );
                }}
                />
                <Route exact path ="/sell" render={routerProps => {
                    return (
                        <Sell routerProps={routerProps}/>
                    )
                }}
                />
        </Switch>
    );
};

export default BodyRouter;