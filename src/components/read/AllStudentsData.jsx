import { Link } from "wouter";


function AllStudentsData({ allStudentsInfo, cookieInfo }) {
   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || cookieInfo.userCategory === "teacher" || (cookieInfo.userCategory === "student" && cookieInfo.userEmail === item.email)) {
         return true;
      } else {
         return false;
      };
   };

   
   return (
      <>
         <h2>STUDENTS</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>COURSE</th>
                     <th>STATUS</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allStudentsInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           {userCategoryCheck(item) ?
                              (<Link href={"/students/" + item.id}>
                                 {item.name} {item.surname}
                              </Link>)

                              :

                              (<span>
                                 {item.name} {item.surname}
                              </span>)
                           }
                        </td>

                        <td>
                           <Link href={"/courses/" + item.course_id}>
                              {item.course_name}
                           </Link>
                        </td>

                        <td>
                           {item.status_name}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllStudentsData;