import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ChildComponent from './pages/TestContx';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import SellerCheckout from './pages/SellerCheckout';
import Admin from './pages/Admin';
import OrderCards from './pages/OrderCards';

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
          <Route path="/customer/orders/:id" component={ OrderDetails } />
          <Route path="/customer/orders" component={ Orders } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="/seller/orders/:id" component={ SellerCheckout } />
          <Route path="/seller/orders" component={ OrderCards } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
