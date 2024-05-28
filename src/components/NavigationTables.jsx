import { Link } from "wouter";


function NavigationTables({ cookieInfo }) {

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
         <div>
            <ul>
               {/* <li>
                  <Link href="/school">
                     SCHOOL
                  </Link>
               </li> */}

               <li>
                  <Link href="/courses">
                     COURSES
                  </Link>
               </li>

               <li>
                  <Link href="/lessons_schedule">
                     LESSONS SCHEDULES
                  </Link>
               </li>

               {userCategoryCheck("teachers") && <li>
                  <Link href="/teachers">
                     TEACHERS
                  </Link>
               </li>}

               <li>
                  <Link href="/students">
                     STUDENTS
                  </Link>
               </li>

               <li>
                  <Link href="/users">
                     USERS
                  </Link>
               </li>

               {/* {userCategoryCheck("status") && <li>
                  <Link href="/status">
                     STATUS
                  </Link>
               </li>} */}

               {userCategoryCheck("backlog") && <li>
                  <Link href="/backlog">
                     BACKLOG
                  </Link>
               </li>}
            </ul>
         </div>
      </>
   );
};


export default NavigationTables;