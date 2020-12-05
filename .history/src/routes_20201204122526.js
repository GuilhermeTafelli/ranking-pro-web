import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom"
import Main from "./pages/Main"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/SignIn"
import RegisterOnEvent from "./pages/RegisterOnEvent"
import UserProfile from "./pages/UserProfile"
import history from './history';
import { isAuthenticated } from "./services/Auth";
import { useDispatch, useSelector } from 'react-redux'
import Ranking from './pages/Ranking'
import Profile from './pages/Profile'

import ResetPassword from "./pages/ResetPassword"
import CustomMenu from "./components/customMenu/CustomMenu"
import SubmitOrder from "./pages/SubmitOrder"
import MyOrders from './pages/MyOrders'

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

function Routes() { 
 
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.isAuthenticated)
  useEffect(() => {  
      dispatch({ type: "SET_SESSION", isAuthenticated: isAuthenticated() })
  });
 
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={CustomMenu} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/socials-media/:socialMediaId" component={Profile} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/submitOrder" component={SubmitOrder} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/orders" component={MyOrders} />

        <Route exact path="/signUp" component={SignUp} />
        <PrivateRoute exact path="/mentoria3ls" component={RegisterOnEvent} />
      </Switch>
    </Router>
  )
}

export default Routes