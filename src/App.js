import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import ProductsPage from "./pages/Products";

const App = () => {
  const [user, setUser] = useState({
    email: "email@teste.com",
  });

  const setUserLoged = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage setUserLoged={setUserLoged} />
        </Route>

        {user ? (
          <Route path="/product" component={ProductsPage} />
        ) : (
          <Redirect to="/login" />
        )}

        {!user ? <Redirect from="/" to="/login" /> : <Redirect to="/product" />}
      </Switch>
    </Router>
  );
};

export default App;
