import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateTeacherForm({ selectedTeacher, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedTeacher) {
      return;
   };

   const [formData, setFormData] = useState({
      name: selectedTeacher.name,
      surname: selectedTeacher.surname,
      birthdate: new Date(selectedTeacher.birthdate).toISOString().split('T')[0],
      email: selectedTeacher.email,
      telef: selectedTeacher.telef,
      address: selectedTeacher.address,
      started: new Date(selectedTeacher.started_at).toISOString().split('T')[0],
      status: selectedTeacher.status_id
   });
   const [result, setResult] = useState({});
   
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


   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.name || !formData.surname || !formData.birthdate || !formData.email || !formData.telef || !formData.address || !formData.started || !formData.status) {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData(`teachers/${selectedTeacher.id}`, "PUT", formData);
      console.log(result);
      setResult(result);

      setFieldsRequired(false);

      if (result.error === "WARNING") {
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
      
      if (result.error !== "WARNING") {
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
                        <h2>Update teacher {selectedTeacher.name} {selectedTeacher.surname}</h2>

                        <label>
                           Name *
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
                           Surname *
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
                           Birthdate *
                           <input
                              type="date"
                              name="birthdate"
                              value={formData.birthdate}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Email *
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
                           Phone *
                           <input
                              placeholder="phone"
                              type="number"
                              name="telef"
                              value={formData.telef}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Address *
                           <input
                              placeholder="address"
                              type="text"
                              name="address"
                              maxLength="255"
                              value={formData.address}
                              onChange={(event) => handleChange(event)}
                           />
                           <p className="instruction">Max 255 characters</p>
                        </label>

                        <label>
                           Started *
                           <input
                              type="date"
                              name="started"
                              value={formData.started}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>                  

                        <label>
                           Status *
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
                           <div className="fieldsRequired">
                           * fields required!
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