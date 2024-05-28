import { Link } from "wouter";
import { useState } from "react";

import CreateCourseForm from "../create/CreateCourseForm";
import UpdateCourseForm from "../update/UpdateCourseForm";
import DeleteCourseForm from "../delete/DeleteCourseForm";


function AllCoursesData({ allCoursesInfo, cookieInfo }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedCourse, setSelectedCourse] = useState(null);

   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || (cookieInfo.userCategory === "teacher" && cookieInfo.userEmail === item.teacher_email)) {
         return true;
      } else {
         return false;
      };
   };

   
   return (
      <>
         <h2>COURSES</h2>

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
                     <th>EDITION</th>
                     <th>TEACHER</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <th></th>
                     }
                  </tr>
               </thead>
               
               <tbody>
                  {allCoursesInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           <Link href={"/courses/" + item.id}>{item.name}</Link>
                        </td>

                        <td>
                           {item.edition_number}
                        </td>

                        <td>
                           {userCategoryCheck(item) ?
                              (<Link href={"/teachers/" + item.teacher_id}>
                                 {item.teacher_name}
                              </Link>)
                              
                              :
                              
                              (<span>
                                 {item.teacher_name}
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
                                    setSelectedCourse(item);
                                    setShowUpdateDialog(true);
                                 }}
                              >
                                 ✏️
                              </button>

                              &nbsp;

                              <button
                                 onClick={() => {
                                    setSelectedCourse(item);
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
                  <CreateCourseForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateCourseForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedCourse={selectedCourse}
                  />

                  <DeleteCourseForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedCourse={selectedCourse}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllCoursesData;