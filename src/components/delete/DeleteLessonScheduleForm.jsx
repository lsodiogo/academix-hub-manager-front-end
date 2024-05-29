import { useState } from "react";

import apiService from "../../services/apiService";


function DeleteLessonScheduleForm({ selectedLessonSchedule, showDeleteDialog, setShowDeleteDialog }) {

   if (!selectedLessonSchedule) {
      return;
   };


   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);


   async function handleDelete() {

      const result = await apiService.fetchData(`lessons_schedule/${selectedLessonSchedule.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      setDialogMessageResult("Lesson schedule deleted with success!");
      setShowDialogMessageResult(true);
   };

   
   async function handleMessageResultButtonClick() {
      setShowDialogMessageResult(false);
      
      window.location.reload();
   };


   async function handleCancelClick() {
      window.location.reload();
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
                  <button type="button" onClick={handleCancelClick}>
                     CANCEL
                  </button>
               </div>
            </dialog>
         )}

         <dialog open={showDialogMessageResult}>
            <div>
               <h2>{dialogMessageResult}</h2>
               <button type="button" onClick={handleMessageResultButtonClick}>OK</button>
            </div>
         </dialog>
      </>
   );
};
 
 
export default DeleteLessonScheduleForm;