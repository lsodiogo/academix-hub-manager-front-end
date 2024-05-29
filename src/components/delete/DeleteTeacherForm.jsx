import { useState } from "react";

import apiService from "../../services/apiService";


function DeleteTeacherForm({ selectedTeacher, showDeleteDialog, setShowDeleteDialog }) {

   if (!selectedTeacher) {
      return;
   };


   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);


   async function handleDelete() {

      const result = await apiService.fetchData(`teachers/${selectedTeacher.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      setDialogMessageResult("Teacher deleted with success!");
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
         {selectedTeacher && (
            <dialog open={showDeleteDialog}>
               <div>
                  <h2>Are you sure you want to delete this teacher?</h2>
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
 
 
export default DeleteTeacherForm;