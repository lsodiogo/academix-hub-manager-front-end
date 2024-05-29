import { Link } from "wouter";
import { useState } from "react";

import CreateStudentForm from "../create/CreateStudentForm";
import UpdateStudentForm from "../update/UpdateStudentForm";
import DeleteStudentForm from "../delete/DeleteStudentForm";


function AllStudentsData({ allStudentsInfo, cookieInfo }) {
   
   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState(null);


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
                     <th>COURSE</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <th></th>
                     }
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

                        {cookieInfo.userCategory === "admin" &&
                           <td>
                              <button
                                 onClick={() => {
                                    setSelectedStudent(item);
                                    setShowUpdateDialog(true);
                                 }}
                              >
                                 ✏️
                              </button>
                              
                              &nbsp;
                              
                              <button
                                 onClick={() => {
                                    setSelectedStudent(item);
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
                  <CreateStudentForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateStudentForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedStudent={selectedStudent}
                  />

                  <DeleteStudentForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedStudent={selectedStudent}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllStudentsData;