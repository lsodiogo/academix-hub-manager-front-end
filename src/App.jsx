import { Route, Switch } from "wouter";

import ScrollToTop from "./components/scroll_top";

import LoginView from "./views/login_view";
import HomeView from "./views/home_view";
import RegisterView from "./views/register_view";

function App() {

  return (
    <>
      <ScrollToTop />
      
      <Switch>

        <Route path="/">
          <HomeView />
        </Route>

        <Route path="/login">
          <LoginView />
        </Route>

        <Route path="/register">
          <RegisterView />
        </Route>

      </Switch>
    </>
  );

};

export default App;