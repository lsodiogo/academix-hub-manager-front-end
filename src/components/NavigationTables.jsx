import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../services/apiService";


function NavigationTables({ cookieInfo }) {

   /* const [schoolInfo, setSchoolInfo] = useState({});


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData("school", "GET");
         console.log(result);

         setSchoolInfo(result.results);
      };
      getAllData();
   }, []); */


   async function logoutPost(event) {
    
      event.preventDefault();

      const result = await apiService.fetchData("login/logout", "GET");
      console.log(result);
      
      if (result.error === "SUCCESS") {        
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
         <div className="navigation-tables-container">
            <div className="navigation-tables-div">
               <Link href="/courses" className="link">
                  COURSES
               </Link>
            </div>

            <div className="navigation-tables-div">
               <Link href="/lessons_schedule" className="link">
                  LESSONS SCHEDULES
               </Link>
            </div>

            {userCategoryCheck("teachers") && <div className="navigation-tables-div">
               <Link href="/teachers" className="link">
                  TEACHERS
               </Link>
            </div>}

            <div className="navigation-tables-div">
               <Link href="/students" className="link">
                  STUDENTS
               </Link>
            </div>

            <div className="navigation-tables-div">
               <Link href="/users" className="link">
                  USERS
               </Link>
            </div>

            {/* {userCategoryCheck("status") && <div className="navigation-tables-div">
               <Link href="/status" className="link">
                  STATUS
               </Link>
            </div>} */}

            {userCategoryCheck("backlog") && <div className="navigation-tables-div">
               <Link href="/backlog" className="link">
                  BACKLOG
               </Link>
            </div>}

            <div>
               <button className="logout-button" onClick={logoutPost}>
                  LOGOUT
               </button>
            </div>
         </div>

         <div className="welcome-container">WELCOME TO ACADEMIX HUB MANAGER OF {/* {schoolInfo.name} */} </div>
      </>
   );
};


export default NavigationTables;