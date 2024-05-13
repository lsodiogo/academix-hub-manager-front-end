import { Route, Switch } from "wouter";

import ScrollToTop from "./components/ScrollToTop";

import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import RegisterView from "./views/RegisterUserView";

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