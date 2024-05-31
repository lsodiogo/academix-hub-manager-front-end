import { Link} from "wouter";
import { useEffect, useState } from "react";

import apiService from "../services/apiService";


function NavigationTables() {

   const [cookieInfo, setCookieInfo] = useState({});
  

   useEffect(function() {
      async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");
         console.log(result);

         setCookieInfo(result);
      };
      checkLogin();
   }, []);

   
   async function logoutPost(event) {
    
      event.preventDefault();

      const result = await apiService.fetchData("login/logout", "GET");
      console.log(result);
      
      if (result.type === "SUCCESS") {        
         window.location.href = "/";
      };
   };
   
   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory !== "admin" && (item === "backlog" || item === "status") ||
            (cookieInfo.userCategory === "student" && item === "teachers")) {
         return false;
      } else {
         return true;
      };
   };


   return (
      <>
         {!cookieInfo.type &&
            <div className="navigation-tables-container">

               <Link href="/courses">
                  <img src="../images/course.svg" alt="course-icon"/>
                  <span>COURSES</span>
               </Link>

               <Link href="/lessons_schedule">
                  <img src="../images/calendar.svg" alt="calendar-icon"/>
                  <span>LESSONS SCHEDULE</span>
               </Link>

               {userCategoryCheck("teachers") &&
                  <Link href="/teachers">
                     <img src="../images/teacher.svg" alt="teacher-icon"/>
                     <span>TEACHERS</span>
                  </Link>
               }

               <Link href="/students">
                  <img src="../images/student.svg" alt="student-icon"/>
                  <span>STUDENTS</span>
               </Link>

               <Link href="/users">
                  <img src="../images/user.svg" alt="user-icon"/>
                  <span>USERS</span>
               </Link>

               {userCategoryCheck("backlog") && 
                  <Link href="/backlog">
                     <img src="../images/backlog.svg" alt="backlog-icon"/>
                     <span>BACKLOG</span>
                  </Link>
               }

               <div>
                  <button className="logout-button" onClick={logoutPost}>
                     <span>LOGOUT</span>
                     <img src="../images/logout.svg" alt="logout-icon"/>
                  </button>
               </div>
            </div>
         }
      </>
   );
};


export default NavigationTables;