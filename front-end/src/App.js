import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ChildComponent from './pages/TestContx';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div>
        {/* Your navigation component if you have any */}
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/test" component={ ChildComponent } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
