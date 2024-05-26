import { useEffect } from "react";
import { Link } from "wouter";


function AllTeachersData({ allTeachersInfo, userLoggedIn }) {
   
   function userCategoryCheck(item) {
      if (userLoggedIn.userCategory === "admin" || (userLoggedIn.userCategory === "teacher" && userLoggedIn.userEmail === item.email)) {
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
                     <th>Name</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allTeachersInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           {userCategoryCheck(item) ? (
                              <Link href={"/teacher/" + item.id}>{item.name} {item.surname}</Link>
                           ) : (
                              <span>{item.name} {item.surname}</span>
                           )}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllTeachersData;