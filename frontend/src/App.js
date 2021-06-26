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
  
  state={};
componentDidMount =() =>{
  fetch(`https://simplemailbackend.herokuapp.com/api/v1/auth/user/getdata`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${localStorage.getItem("jwt")}`,
    },
  
  })  .then((res) => res.json())
  .then(
    data =>{
      console.log(data)
     
      
    },
    err =>{
     console.log(err)
    }
  )
}

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
