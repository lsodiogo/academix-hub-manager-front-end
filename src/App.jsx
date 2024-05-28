import { Route, Switch } from "wouter";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import HomeView from "./views/HomeView";

import CoursesView from "./views/CoursesView";
import LessonsScheduleView from "./views/LessonsScheduleView";
import TeachersView from "./views/TeachersView";
import StudentsView from "./views/StudentsView";
import UsersView from "./views/UsersView";
import BacklogView from "./views/BacklogView";

import NotFoundView from "./views/PageNotFoundView";

import "@picocss/pico";


function App() {

  return (
    <>
      <ScrollToTop />

      <Header />
      
      <Switch>

        <Route path="/">
          <HomeView />
        </Route>
        
        <Route path="/courses">
          <CoursesView />
        </Route>

        <Route path="/lessons_schedule">
          <LessonsScheduleView />
        </Route>

        <Route path="/teachers">
          <TeachersView />
        </Route>

        <Route path="/students">
          <StudentsView />
        </Route>

        <Route path="/users">
          <UsersView />
        </Route>

        <Route path="/backlog">
          <BacklogView />
        </Route>

        <Route path="/courses/:id">
          {params => <CoursesView pathParams={params.id}/>}
        </Route>

        <Route path="/lessons_schedule/:id">
          {params => <LessonsScheduleView pathParams={params.id}/>}
        </Route>

        <Route path="/teachers/:id">
          {params => <TeachersView pathParams={params.id}/>}
        </Route>

        <Route path="/students/:id">
          {params => <StudentsView pathParams={params.id}/>}
        </Route>

        <Route path="/users/:id">
          {params => <UsersView pathParams={params.id}/>}
        </Route>

        <Route>
          <NotFoundView />
        </Route>

      </Switch>
    </>
  );
};


export default App;