import logo from './logo.svg';
import Home from './components/home'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Component } from 'react';
import React from 'react';
import Login from './components/login';

import axios from 'axios';

class App extends React.Component {

  state = {};
  componentDidMount = () => {

  }

  constructor(props) {
    super(props);
    if (window.location.pathname === "/") {
      axios.get('https://simplemailbackend.herokuapp.com/api/v1/token/verify', {
        headers: {
          "x-access-token": localStorage.getItem('jwt')
        }
      }).then(resp => {
        console.log(resp);
        window.open("/home", "_self");
      }).catch(er => {
        console.log(er)
      });
    }
  }
  render() {

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={() => <Home />} />
        </Switch>
      </BrowserRouter>

    );
  }
}
export default App;
