import { Route, Switch } from "wouter";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

import HomeView from "./views/HomeView";
import AllCoursesView from "./views/AllCoursesView";
import AllLessonsScheduleView from "./views/AllLessonsScheduleView";
import AllTeachersView from "./views/AllTeachersView";
import AllStudentsView from "./views/AllStudentsView";
import AllUsersView from "./views/AllUsersView";
import AllBacklogView from "./views/AllBacklogView";

import CourseByIdView from "./views/CourseByIdView";
import LessonScheduleByIdView from "./views/LessonScheduleByIdView";
import TeacherByIdView from "./views/TeacherByIdView";
import StudentByIdView from "./views/StudentByIdView";
import UserByIdView from "./views/UserByIdView";

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
        
        <Route path="/courses">
          <AllCoursesView />
        </Route>

        <Route path="/lessons_schedule">
          <AllLessonsScheduleView />
        </Route>

        <Route path="/teachers">
          <AllTeachersView />
        </Route>

        <Route path="/students">
          <AllStudentsView />
        </Route>

        <Route path="/users">
          <AllUsersView />
        </Route>

        <Route path="/backlog">
          <AllBacklogView />
        </Route>

        <Route path="/course/:id">
          {params => <CourseByIdView pathParams={params.id}/>}
        </Route>

        <Route path="/lesson_schedule/:id">
          {params => <LessonScheduleByIdView pathParams={params.id}/>}
        </Route>

        <Route path="/teacher/:id">
          {params => <TeacherByIdView pathParams={params.id}/>}
        </Route>

        <Route path="/student/:id">
          {params => <StudentByIdView pathParams={params.id}/>}
        </Route>

        <Route path="/user/:id">
          {params => <UserByIdView pathParams={params.id}/>}
        </Route>

        <Route>
          <NotFoundView />
        </Route>

      </Switch>
    </>
  );
};


export default App;