import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/SignIn"
import RegisterOnEvent from "./pages/RegisterOnEvent"
import history from './history';
import { isAuthenticated, getUser } from "./services/Auth";
import { useDispatch, useSelector } from 'react-redux'
import Ranking from './pages/Ranking'
import Profile from './pages/Profile'

import ResetPassword from "./pages/ResetPassword"
import CustomMenu from "./components/customMenu/CustomMenu"
import CustomVerticalMenu from "./components/customMenu/CustomVerticalMenu"

import SubmitOrder from "./pages/SubmitOrder"
import MyOrders from './pages/MyOrders'
import Orders from "./pages/admin/Orders"
import AdminHome from "./pages/admin/Home"
import Home from "./pages/Home"

import Order from "./pages/admin/Order"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
        )
    }
  />
);

const AdminPrivateRoute = ({ component: Component, ...rest }) => {


  return(

    <Route

      {...rest}
      render={props =>
        getUser() && getUser().roles && getUser().roles.includes("ADMIN") && isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
          )
      }
    />
  );

}

function Routes() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "SET_SESSION", isAuthenticated: isAuthenticated() })
  });

  return (
    <Router history={history}>
      <Switch>
        <AdminPrivateRoute exact path="/admin/orders" component={Orders} />
        <AdminPrivateRoute exact path="/admin/orders/:orderId" component={Order} />
        <AdminPrivateRoute exact path="/admin" component={AdminHome} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/socials-media/:socialMediaId" component={Profile} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/" component={Home} />

        <Route exact path="/resetPassword" component={ResetPassword} />

        <Route exact path="/signUp" component={SignUp} />
        <PrivateRoute exact path="/orders" component={MyOrders} />
        <PrivateRoute exact path="/submitOrder" component={SubmitOrder} />
        <PrivateRoute exact path="/mentoria3ls" component={RegisterOnEvent} />
      </Switch>
    </Router>
  )
}

export default Routes