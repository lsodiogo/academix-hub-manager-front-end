/* import { useState } from "react"; */

import apiService from "../../services/apiService";


function DeleteUserForm({ selectedUser, showDeleteDialog, setShowDeleteDialog, cookieInfo }) {

   if (!selectedUser) {
      return;
   };


   /* const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false); */


   async function handleDelete() {

      const result = await apiService.fetchData(`users/${selectedUser.id}`, "DELETE");
      console.log(result);

      setShowDeleteDialog(false);

      /* setDialogMessageResult("User deleted with success!");
      setShowDialogMessageResult(true); */

      if (selectedUser.email === cookieInfo.userEmail) {
         await apiService.fetchData("login/logout", "GET");
         window.location.href = "/";

      } else {
         window.location.reload();
      };
   };

    
   return (
      <>
         {selectedUser && (
            <dialog open={showDeleteDialog}>
               <div>
                  <h2>Are you sure you want to delete this user?</h2>
                  <button type="submit" onClick={handleDelete}>
                     CONFIRM
                  </button>
                  <button type="button" onClick={() => setShowDeleteDialog(false)}>
                     CANCEL
                  </button>
               </div>
            </dialog>
         )}

         {/* <dialog open={showDialogMessageResult}>
            <div>
               <h2>{dialogMessageResult}</h2>
               <button onClick={() => setShowDialogMessageResult(false)}>OK</button>
            </div>
         </dialog> */}
      </>
   );
};
 
 
export default DeleteUserForm;




// when deleted do logout