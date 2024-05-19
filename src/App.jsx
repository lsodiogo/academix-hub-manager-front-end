import { Route, Switch } from "wouter";

import ScrollToTop from "./components/ScrollToTop";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";

import HomeView from "./views/HomeView";
import AllStudentsView from "./views/AllStudentsView";
import AllCoursesView from "./views/AllCoursesView";
import StudentByIdView from "./views/StudentByIdView";
import CourseByIdView from "./views/CourseByIdView";
import NotFoundView from "./views/NotFoundView";

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

        <Route path="/allstudents">
          <AllStudentsView />
        </Route>

        <Route path="/allcourses">
          <AllCoursesView />
        </Route>

        <Route path="/student/:id">
          {params => <StudentByIdView pathParams={params.id}/>}
        </Route>

        <Route path="/course/:id">
          {params => <CourseByIdView pathParams={params.id}/>}
        </Route>

        <Route>
          <NotFoundView />
        </Route>

      </Switch>
    </>
  );
};


export default App;