import { Link } from "wouter";


function NavigationTables() {

   
   return (
      <>
         <div>
            <ul>
               <li>
                  <Link href="/x">
                     <span>SCHOOL</span>
                  </Link>
               </li>

               <li>
                  <Link href="/allcourses">
                     <span>COURSES</span>
                  </Link>
               </li>

               <li>
                  <Link href="/x">
                     <span>LESSONS SCHEDULES</span>
                  </Link>
               </li>

               <li>
                  <Link href="/x">
                     <span>TEACHERS</span>
                  </Link>
               </li>

               <li>
                  <Link href="/allstudents">
                     <span>STUDENTS</span>
                  </Link>
               </li>

               <li>
                  <Link href="/x">
                     <span>USERS</span>
                  </Link>
               </li>

               <li>
                  <Link href="/x">
                     <span>BACKLOG</span>
                  </Link>
               </li>
            </ul>
         </div>
      </>
   );
};


export default NavigationTables;