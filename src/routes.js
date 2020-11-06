import React from "react"
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom"
import Main from "./pages/Main"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import UserProfile from "./pages/UserProfile"
import history from './history';
import { isAuthenticated } from "./services/Auth";

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

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
    </Switch>
  </Router>
)

export default Routes