import { Link } from "wouter";


function AllStudentData({ allStudentsInfo, userLoggedIn }) {
   
   function userCategoryCheck(item) {
      if (userLoggedIn.userCategory === "admin" || userLoggedIn.userCategory === "teacher" || (userLoggedIn.userCategory === "student" && userLoggedIn.userEmail === item.email)) {
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
                  {allStudentsInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           {userCategoryCheck(item) ? (
                              <Link href={"/student/" + item.id}>{item.name} {item.surname}</Link>
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


export default AllStudentData;