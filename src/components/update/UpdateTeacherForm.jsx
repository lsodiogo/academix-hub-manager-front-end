import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateTeacherForm({ selectedTeacher, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedTeacher) {
      return;
   };

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   const [formData, setFormData] = useState({
      name: selectedTeacher.name,
      surname: selectedTeacher.surname,
      birthdate: FormatDate(selectedTeacher.birthdate).split("/").reverse().join("-"),
      email: selectedTeacher.email,
      telef: selectedTeacher.telef,
      address: selectedTeacher.address,
      started: FormatDate(selectedTeacher.started_at).split("/").reverse().join("-"),
      status: selectedTeacher.status_id
   });

   const [status, setStatus] = useState([]);
   
   const [fieldsRequired, setFieldsRequired] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);

   useEffect(function() {
      async function getDataForSelectOptions() {

         const getTotalStatus = await apiService.fetchData("status", "GET");
         const resultStatus = await apiService.fetchData(`status/?limit=${getTotalStatus.totalItems}&offset=0`, "GET");

         setStatus(resultStatus.results);
      };
      getDataForSelectOptions();
   }, []);

   function handleChange(event) {
      event.preventDefault();

      const { name, value } = event.target;

      setFieldsRequired(false);
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
   };

   function getMaxBirthdate() {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 18);
  
      const year = today.getFullYear();
      let month = String(today.getMonth() + 1);
      let day = String(today.getDate());
  
      if (month.length < 2) {
        month = "0" + month;
      };
  
      if (day.length < 2) {
        day = "0" + day;
      };
  
      const maxBirthdate = `${year}-${month}-${day}`;

      return maxBirthdate;
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.name || !formData.surname || !formData.birthdate || !formData.email || !formData.telef || !formData.address || !formData.started || !formData.status) {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData(`teachers/${selectedTeacher.id}`, "PUT", formData);

      setFieldsRequired(false);

      if (result.type === "WARNING") {
         setDialogMessageResult("Teacher already exists!");
         setShowDialogMessageResult(true);

      } else {
         setShowUpdateDialog(false);

         setDialogMessageResult("Teacher updated with success!");
         setShowDialogMessageResult(true);
      };
   };

   async function handleMessageResultButtonClick() {
      setShowDialogMessageResult(false);
      
      if (result.type !== "WARNING") {
         window.location.reload();
      };
   };

   async function handleCancelClick() {
      window.location.reload();
   };

 
   return (
      <>
         <dialog open={showUpdateDialog}>
            <div className="dialogScroll">
               <form onSubmit={handleSubmit}>
                  <fieldset>
                     <h1>UPDATE TEACHER {selectedTeacher.name} {selectedTeacher.surname}</h1>

                     <label>
                        NAME *
                        <input
                           placeholder="name"
                           type="text"
                           name="name"
                           maxLength="255"
                           value={formData.name}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        SURNAME *
                        <input
                           placeholder="surname"
                           type="text"
                           name="surname"
                           maxLength="255"
                           value={formData.surname}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        BIRTHDATE *
                        <input
                           type="date"
                           name="birthdate"
                           max={getMaxBirthdate()}
                           value={formData.birthdate}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">Teacher must be at least 18 years</div>
                     </label>

                     <label>
                        EMAIL *
                        <input
                           placeholder="email"
                           type="email"
                           name="email"
                           maxLength="255"
                           value={formData.email}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        PHONE *
                        <input
                           placeholder="phone"
                           type="number"
                           name="telef"
                           value={formData.telef}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        ADDRESS *
                        <input
                           placeholder="address"
                           type="text"
                           name="address"
                           maxLength="255"
                           value={formData.address}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">Max 255 characters</div>
                     </label>

                     <label>
                        STARTED *
                        <input
                           type="date"
                           name="started"
                           value={formData.started}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>                  

                     <label>
                        STATUS *
                        <select
                        name="status"
                        value={formData.status}
                        onChange={(event) => handleChange(event)}
                        >
                           {status
                              .filter((status) => status.description.includes("teachers"))
                              .map((status) =>
                                 <option key={status.id} value={status.id}>{status.name}</option>
                              )
                           }
                        </select>
                     </label>

                     {fieldsRequired &&
                        <div className="alert-message">
                        * FIELDS REQUIRED!
                        </div>
                     }

                     <div>
                        <button type="submit">
                           UPDATE
                        </button>
                        <button type="button" onClick={handleCancelClick}>
                           CANCEL
                        </button>
                     </div>
                  </fieldset>
               </form>
            </div>
         </dialog>

         <dialog open={showDialogMessageResult}>
            <div>
               <h2>{dialogMessageResult}</h2>
               <button type="button" onClick={handleMessageResultButtonClick}>OK</button>
            </div>
         </dialog>
      </>
   );
};


export default UpdateTeacherForm;