import React, {  useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/SignIn"
import RegisterOnEvent from "./pages/RegisterOnEvent"
import history from './history';
import { isAuthenticated, getUser } from "./services/Auth";
import { useDispatch } from 'react-redux'
import Ranking from './pages/Ranking'
import Profile from './pages/Profile'
import CustomMenu from './components/customMenu/CustomMenu'
import ResetPassword from "./pages/ResetPassword"
import ResetPasswordValidate from "./pages/ResetPasswordValidate"

import SubmitOrder from "./pages/SubmitOrder"
import MyOrders from './pages/MyOrders'
import Orders from "./pages/admin/Orders"
import AdminHome from "./pages/admin/Home"
import Home from "./pages/Home"
import InstagramProfile from "./pages/InstagramProfile"

import Order from "./pages/admin/Order"
import Privacy from "./pages/policies/Privacy"
import Terms from "./pages/policies/Terms"
import Building from "./pages/Building"
import VerifyGamificationCode from "./pages/VerifyGamificationCode"
import MyGamificationCodes from "./pages/MyGamificationCodes"

import RankingScore from "./pages/RankingScore"
import MyInstagramProfileSimulations from "./pages/MyInstagramProfileSimulations"
import CreateInstagramProfileSimulation from "./pages/CreateInstagramProfileSimulation"

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
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />

        <Route exact path="/socials-media/:socialMediaId" component={Profile} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/ranking/score" component={RankingScore} />

        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={CustomMenu} />

        <PrivateRoute exact path="/simulations/instagram" component={MyInstagramProfileSimulations} />
        <PrivateRoute exact path="/simulations/instagram/:id" component={InstagramProfile} />
        <PrivateRoute exact path="/simulations/new/instagram" component={CreateInstagramProfileSimulation} />


        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/resetPassword/email/:email/token/:token" component={ResetPasswordValidate} />

        <Route exact path="/forum" component={Building} />
        <Route exact path="/class" component={Building} />

        <Route exact path="/signUp" component={SignUp} />
        <PrivateRoute exact path="/orders" component={MyOrders} />
        
        <PrivateRoute exact path="/new/gamification/code" component={MyGamificationCodes} />
        <PrivateRoute exact path="/new/verify/gamification/code" component={VerifyGamificationCode} />

        <PrivateRoute exact path="/submitOrder" component={SubmitOrder} />
        <PrivateRoute exact path="/mentoria3ls" component={RegisterOnEvent} />
      </Switch>
    </Router>
  )
}

export default Routes