import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function CreateCourseForm({ showCreateDialog, setShowCreateDialog }) {

   const [formData, setFormData] = useState({
      name: "",
      edition: "",
      duration: "",
      start: "",
      finish: "",
      description: "",
      teacher: "",
      status: ""
   });

   const [teachers, setTeachers] = useState([]);
   const [status, setStatus] = useState([]);
   
   const [fieldsRequired, setFieldsRequired] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);

   useEffect(function() {
      async function getDataForSelectOptions() {

         const getTotalTeachers = await apiService.fetchData("teachers", "GET");
         const resultTeachers = await apiService.fetchData(`teachers/?limit=${getTotalTeachers.totalItems}&offset=0`, "GET");

         setTeachers(resultTeachers.results);

         const getTotalStatus = await apiService.fetchData("status", "GET");
         const resultStatus = await apiService.fetchData(`status/?limit=${getTotalStatus.totalItems}&offset=0`, "GET");

         setStatus(resultStatus.results);
      };
      getDataForSelectOptions();
   }, []);

   const getTomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

   function handleChange(event) {
      event.preventDefault();

      const { name, value } = event.target;

      setFieldsRequired(false);
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.name || !formData.edition || !formData.duration || !formData.start || !formData.finish || !formData.teacher || !formData.status || formData.teacher === "notanoption" || formData.status === "notanoption") {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData("courses", "POST", formData);

      setFieldsRequired(false);

      if (result.type === "WARNING") {
         setDialogMessageResult("Same name and same edition number already exists!");
         setShowDialogMessageResult(true);

      } else {
         setFormData({
            name: "",
            edition: "",
            duration: "",
            start: "",
            finish: "",
            description: "",
            teacher: "",
            status: ""
         });

         setShowCreateDialog(false);

         setDialogMessageResult("Course created with success!");
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
         <dialog open={showCreateDialog}>
            <div className="dialogScroll">
               <form onSubmit={handleSubmit}>
                  <fieldset>
                     <h1>CREATE NEW COURSE</h1>

                     <label>
                        NAME *
                        <input
                           placeholder="ex: Full Stack Web Development"
                           type="text"
                           name="name"
                           maxLength="255"
                           value={formData.name}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        EDITION NUMBER *
                        <input
                           placeholder="ex: 12345"
                           type="number"
                           name="edition"
                           min="0"
                           max="99999"
                           maxLength="5"
                           value={formData.edition}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">Max 5 numbers</div>
                     </label>

                     <label>
                        DURATION *
                        <input
                           placeholder="ex: 720"
                           type="number"
                           name="duration"
                           min="0"
                           max="9999"
                           value={formData.duration}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">Max 4 numbers</div>
                     </label>

                     <label>
                        START *
                        <input
                           type="date"
                           name="start"
                           min={getTomorrowDate}
                           value={formData.start}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        FINISH *
                        <input
                           type="date"
                           name="finish"
                           min={formData.start}
                           value={formData.finish}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        DESCRIPTION
                        <input
                           placeholder="description"
                           type="text"
                           name="description"
                           maxLength="255"
                           value={formData.description}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">Max 255 characters</div>
                     </label>

                     <label>
                        TEACHER *
                        <select
                        name="teacher"
                        value={formData.teacher}
                        onChange={(event) => handleChange(event)}
                        >
                           <option value="notanoption">select teacher</option>
                           {teachers
                              .filter((teacher) => teacher.status_name === "Active")
                              .map((teacher) =>
                                 <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                              )
                           }
                        </select>
                        <div className="instruction">Only teachers with active status</div>
                     </label>

                     <label>
                        STATUS *
                        <select
                        name="status"
                        value={formData.status}
                        onChange={(event) => handleChange(event)}
                        >
                           <option value="notanoption">select status</option>
                           {status
                              .filter((status) => status.description.includes("courses"))
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
                           CREATE
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


export default CreateCourseForm;