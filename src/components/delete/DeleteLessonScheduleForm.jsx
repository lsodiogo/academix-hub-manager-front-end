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

      if (result.type !== "WARNING") {
         setShowDeleteDialog(false);

         setDialogMessageResult("Lesson schedule deleted with success!");
         setShowDialogMessageResult(true);

      } else {
         setShowDeleteDialog(false);
         
         setDialogMessageResult("Something went wrong!");
         setShowDialogMessageResult(true);
      };
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
                  <h2>ARE YOU SURE YOU WANT TO DELETE THIS LESSON SCHEDULE?</h2>
                  <div className="confirmation-buttons">
                     <button className="confirm-button" type="submit" onClick={handleDelete}>
                        CONFIRM
                     </button>
                     <button className="cancel-button" type="button" onClick={handleCancelClick}>
                        CANCEL
                     </button>
                  </div>
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