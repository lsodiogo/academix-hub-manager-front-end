import { Route, Switch } from "wouter";

import ScrollToTop from "./components/ScrollToTop";

import LoginView from "./views/LoginView";
import StudentView from "./views/StudentView";
import NotFoundView from "./views/NotFoundView";

import "@picocss/pico";

function App() {

  return (
    <>
      <ScrollToTop />
      
      <Switch>

        <Route path="/">
          <LoginView />
        </Route>

        <Route path="/students">
          <StudentView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>

      </Switch>
    </>
  );

};

export default App;