import { useState } from "react";

import apiService from "../../services/apiService";


function DeleteUserForm({ selectedUser, showDeleteDialog, setShowDeleteDialog, cookieInfo }) {

   if (!selectedUser) {
      return;
   };


   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);


   async function handleDelete() {

      const result = await apiService.fetchData(`users/${selectedUser.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      setDialogMessageResult("User deleted with success!");
      setShowDialogMessageResult(true);
   };


   async function handleMessageResultButtonClick() {
      setShowDialogMessageResult(false);
      
      if (selectedUser.email === cookieInfo.userEmail) {
         await apiService.fetchData("login/logout", "GET");
         window.location.href = "/";

      } else {
         window.location.reload();
      };
   };


   async function handleCancelClick() {
      window.location.reload();
   };

    
   return (
      <>
         {selectedUser && (
            <dialog open={showDeleteDialog}>
               <div>
                  <h2>ARE YOU SURE YOU WANT TO DELETE THIS USER?</h2>
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

         {<dialog open={showDialogMessageResult}>
            <div>
               <h2>{dialogMessageResult}</h2>
               <button type="button" onClick={handleMessageResultButtonClick}>OK</button>
            </div>
         </dialog>}
      </>
   );
};
 
 
export default DeleteUserForm;