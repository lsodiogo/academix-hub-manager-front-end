import { Link } from "wouter";
import { useState } from "react";

import CreateLessonScheduleForm from "../create/CreateLessonScheduleForm";
import UpdateLessonScheduleForm from "../update/UpdateLessonScheduleForm";
import DeleteLessonScheduleForm from "../delete/DeleteLessonScheduleForm";


function AllLessonsScheduleData({ allLessonsScheduleInfo, cookieInfo }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedLessonSchedule, setSelectedLessonSchedule] = useState(null);


   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>LESSONS SCHEDULES</h2>

         {cookieInfo.userCategory === "admin" &&
            <button onClick={() => setShowCreateDialog(true)}>
               ADD NEW
            </button>
         }

         <div>
            <table>
               <thead>
                  <tr>
                     <th>DATE</th>
                     <th>BEGIN</th>
                     <th>END</th>
                     <th>COURSE</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <th></th>
                     }
                  </tr>
               </thead>
               
               <tbody>
                  {allLessonsScheduleInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           <Link href={"/lessons_schedule/" + item.id}>{formatDate(item.date)}</Link>
                        </td>

                        <td>
                           {item.begin_time}
                        </td>

                        <td>
                           {item.end_time}
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
                                    setSelectedLessonSchedule(item);
                                    setShowUpdateDialog(true);
                                 }}
                              >
                                 ✏️
                              </button>
                              
                              &nbsp;
                              
                              <button
                                 onClick={() => {
                                    setSelectedLessonSchedule(item);
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
                  <CreateLessonScheduleForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateLessonScheduleForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedLessonSchedule={selectedLessonSchedule}
                  />

                  <DeleteLessonScheduleForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedLessonSchedule={selectedLessonSchedule}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllLessonsScheduleData;