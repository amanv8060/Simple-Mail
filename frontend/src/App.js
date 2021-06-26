import logo from './logo.svg';
import Home from './components/home'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/login';
function App() {
  return (
 
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>

  );
}

export default App;
