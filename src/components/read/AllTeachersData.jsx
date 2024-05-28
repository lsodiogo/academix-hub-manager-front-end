import { Link } from "wouter";


function AllTeachersData({ allTeachersInfo, cookieInfo }) {
   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || (cookieInfo.userCategory === "teacher" && cookieInfo.userEmail === item.email)) {
         return true;
      } else {
         return false;
      };
   };

   
   return (
      <>
         <h2>TEACHERS</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>STATUS</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allTeachersInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           {userCategoryCheck(item) ?
                              (<Link href={"/teachers/" + item.id}>
                                 {item.name} {item.surname}
                              </Link>)
                              
                              :
                              
                              (<span>
                                 {item.name} {item.surname}
                              </span>)
                           }
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


export default AllTeachersData;