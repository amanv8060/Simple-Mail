import logo from './logo.svg';
import Home from './components/home'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Component } from 'react';
import Login from './components/login';
export default class App extends Component{



  render() {
  return (
 
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={()=><Home/>} />
        </Switch>
      </BrowserRouter>

  );
}

}
