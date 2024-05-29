import { Link } from "wouter";
import { useState } from "react";

import CreateTeacherForm from "../create/CreateTeacherForm";
import UpdateTeacherForm from "../update/UpdateTeacherForm";
import DeleteTeacherForm from "../delete/DeleteTeacherForm";


function AllTeachersData({ allTeachersInfo, cookieInfo }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedTeacher, setSelectedTeacher] = useState(null);
   
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

         {cookieInfo.userCategory === "admin" &&
            <button onClick={() => setShowCreateDialog(true)}>
               ADD NEW
            </button>
         }

         <div>
            <table>
               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <th></th>
                     }
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

                        {cookieInfo.userCategory === "admin" &&
                           <td>
                              <button
                                 onClick={() => {
                                    setSelectedTeacher(item);
                                    setShowUpdateDialog(true);
                                 }}
                              >
                                 ✏️
                              </button>
                              
                              &nbsp;
                              
                              <button
                                 onClick={() => {
                                    setSelectedTeacher(item);
                                    setShowDeleteDialog(true);
                                 }}
                              >
                                 ❌
                              </button>
                           </td>
                        }
                     </tr>
                  )}
               </tbody>
            </table>

            {cookieInfo.userCategory === "admin" &&
               <div>
                  <CreateTeacherForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateTeacherForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedTeacher={selectedTeacher}
                  />

                  <DeleteTeacherForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedTeacher={selectedTeacher}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllTeachersData;