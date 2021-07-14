import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ProductsPage from "./pages/Products";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/product" component={ProductsPage} />
        <Redirect from="/" to="/product" />
      </Switch>
    </Router>
  );
};

export default App;
