import { Link } from "wouter";
import { useState } from "react";

import CreateUserForm from "../create/CreateUserForm";
import UpdateUserForm from "../update/UpdateUserForm";
import DeleteUserForm from "../delete/DeleteUserForm";


function AllUsersData({ allUsersInfo, userLoggedInInfo, cookieInfo }) {
   
   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);


   return (
      <>
         <h2>USERS</h2>

         {cookieInfo.userCategory === "admin" &&
            <button onClick={() => setShowCreateDialog(true)}>
               ADD NEW
            </button>
         }

         <div>
            <table>
               <thead>
                  <tr>
                     <th>EMAIL</th>
                     <th>CATEGORY</th>
                     {(cookieInfo.userCategory === "admin" || userLoggedInInfo) &&
                        <th></th>
                     }
                  </tr>
               </thead>

               <tbody>
                  {cookieInfo.userCategory === "admin" ?
                     (allUsersInfo.map((item) => (
                           <tr key={item.id}>
                              <td>
                                 <Link href={"/users/" + item.id}>{item.email}</Link>
                              </td>

                              <td>
                                 {item.category}
                              </td>

                              <td>
                                 {item.email === cookieInfo.userEmail &&
                                    <button
                                       onClick={() => {
                                          setSelectedUser(item);
                                          setShowUpdateDialog(true);
                                       }}
                                    >
                                       ✏️
                                    </button>
                                 }

                                 {(item.email === cookieInfo.userEmail || item.category !== cookieInfo.userCategory) && <button
                                    onClick={() => {
                                       setSelectedUser(item);
                                       setShowDeleteDialog(true);
                                    }}
                                 >
                                    ❌
                                 </button>}
                              </td>
                           </tr>
                        ))

                     ) 
                     
                     :
                     
                     (<tr>
                           <td>
                              <Link href={"/users/" + userLoggedInInfo.id}>{userLoggedInInfo.email}</Link>
                           </td>

                           <td>
                              {userLoggedInInfo.category}
                           </td>

                           <td>
                              {userLoggedInInfo.email === cookieInfo.userEmail &&
                                 <button
                                    onClick={() => {
                                       setSelectedUser(userLoggedInInfo);
                                       setShowUpdateDialog(true);
                                    }}
                                 >
                                    ✏️
                                 </button>
                              }
                           </td>
                        </tr>
                     )
                  }  
               </tbody>
            </table>

            {cookieInfo.userCategory === "admin" &&
               <div>
                  <CreateUserForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <DeleteUserForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedUser={selectedUser}
                     cookieInfo={cookieInfo}
                  />
               </div>
            }

            <UpdateUserForm
               showUpdateDialog={showUpdateDialog}
               setShowUpdateDialog={setShowUpdateDialog}
               selectedUser={selectedUser}
               cookieInfo={cookieInfo}
            />
         </div>
      </>
   );
};


export default AllUsersData;