import { useState } from "react";

import apiService from "../../services/apiService";


function DeleteCourseForm({ selectedCourse, showDeleteDialog, setShowDeleteDialog }) {

   if (!selectedCourse) {
      return;
   };


   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);


   async function handleDelete() {

      const result = await apiService.fetchData(`courses/${selectedCourse.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      setShowDialogMessageResult(true);
      setDialogMessageResult("Course deleted with success!");
   };

    
   return (
      <>
         {selectedCourse && (
            <dialog open={showDeleteDialog}>
               <div>
                  <h2>Are you sure you want to delete this course?</h2>
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
 
 
export default DeleteCourseForm;