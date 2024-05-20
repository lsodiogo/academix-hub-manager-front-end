import { Link } from "wouter";


function AllUsersData({ allUsersInfo, userInfo, userLoggedIn }) {
   
   return (
      <>
         <h2>USERS</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>Email</th>
                  </tr>
               </thead>

               <tbody>
                  {userLoggedIn.userCategory === "admin"  ?
                     (
                        allUsersInfo.map((item) => (
                           <tr key={item.id}>
                              <td>
                                 <Link href={"/user/" + item.id}>{item.email}</Link>
                              </td>
                           </tr>
                        ))

                     ) : (

                        <tr>
                           <td>
                              <Link href={"/user/" + userInfo.id}>{userInfo.email}</Link>
                           </td>
                        </tr>
                     )
                  }  
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllUsersData;