import React, {Component}  from 'react';
import Routes from "./routes"
import { useHistory } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import './global.css'
Yup.setLocale(pt);

export default function App() {  

  const history = useHistory();

  return (
    <Provider store={store}>
      <Routes />
     </Provider>
  )
}