import React, {Component}  from 'react';
import Routes from "./routes"
import { useHistory } from "react-router-dom";

export default function App() {  

  const history = useHistory();

  return (
    <Routes />
  )
}