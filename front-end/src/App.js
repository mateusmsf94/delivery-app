import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ChildComponent from './TestContx';

function App() {
  return (
    <Router>
      <div>
        {/* Your navigation component if you have any */}
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/test" component={ ChildComponent } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
