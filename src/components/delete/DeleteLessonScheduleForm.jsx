import { useState } from "react";

import apiService from "../../services/apiService";


function DeleteLessonScheduleForm({ selectedLessonSchedule, showDeleteDialog, setShowDeleteDialog }) {

   if (!selectedLessonSchedule) {
      return;
   };


   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);


   async function handleDelete() {

      const result = await apiService.fetchData(`lessons_schedule/${selectedLessonSchedule.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      setShowDialogMessageResult(true);
      setDialogMessageResult("Lesson schedule deleted with success!");
   };

    
   return (
      <>
         {selectedLessonSchedule && (
            <dialog open={showDeleteDialog}>
               <div>
                  <h2>Are you sure you want to delete this lesson schedule?</h2>
                  <button type="submit" onClick={handleDelete}>
                     CONFIRM
                  </button>
                  <button type="button" onClick={() => setShowDeleteDialog(false)}>
                     CANCEL
                  </button>
               </div>
            </dialog>
         )}

         <dialog open={showDialogMessageResult}>
            <div>
               <h2>{dialogMessageResult}</h2>
               <button onClick={() => setShowDialogMessageResult(false)}>OK</button>
            </div>
         </dialog>
      </>
   );
};
 
 
export default DeleteLessonScheduleForm;