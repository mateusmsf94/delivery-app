import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ChildComponent from './pages/TestContx';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route path="/login" component={ Login } />
          <Route path="/test" component={ ChildComponent } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ Checkout } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
