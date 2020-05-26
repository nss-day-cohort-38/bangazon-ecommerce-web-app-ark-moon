import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './homePage/HomePage'

const BodyRouter = () => {
    return(
        <Switch>
                <Route exact path="/" render={routerProps => {
                    return (
                        <HomePage routerProps={routerProps} />
                    );
                }}
                />
        </Switch>
    );
};

export default BodyRouter;