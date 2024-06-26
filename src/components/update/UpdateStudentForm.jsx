import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateStudentForm({ selectedStudent, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedStudent) {
      return;
   };

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   const [formData, setFormData] = useState({
      name: selectedStudent.name,
      surname: selectedStudent.surname,
      birthdate: FormatDate(selectedStudent.birthdate).split("/").reverse().join("-"),
      email: selectedStudent.email,
      telef: selectedStudent.telef,
      address: selectedStudent.address,
      enrolled: FormatDate(selectedStudent.enrolled_at).split("/").reverse().join("-"),
      course: selectedStudent.course_id,
      grade: selectedStudent.grade !== null ? selectedStudent.grade : "",
      graduated: selectedStudent.graduated_at !== null ? FormatDate(selectedStudent.graduated_at) : "",
      status: selectedStudent.status_id
   });
   
   const [courses, setCourses] = useState([]);
   const [status, setStatus] = useState([]);
   
   const [fieldsRequired, setFieldsRequired] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);

   useEffect(function() {
      async function getDataForSelectOptions() {

         const getTotalCourses = await apiService.fetchData("courses", "GET");
         const resultCourses = await apiService.fetchData(`courses/?limit=${getTotalCourses.totalItems}&offset=0`, "GET");

         setCourses(resultCourses.results);

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

   const getTomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
   
   function getMaxBirthdate() {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 16);
  
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

      if (!formData.name || !formData.surname || !formData.birthdate || !formData.email || !formData.telef || !formData.address || !formData.enrolled || !formData.course || !formData.status) {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData(`students/${selectedStudent.id}`, "PUT", formData);

      setFieldsRequired(false);

      if (result.type === "WARNING") {
         setDialogMessageResult("Student already exists!");
         setShowDialogMessageResult(true);

      } else {
         setShowUpdateDialog(false);

         setDialogMessageResult("Student updated with success!");
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
                     <h1>UPDATE STUDENT {selectedStudent.name} {selectedStudent.surname}</h1>

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
                        ENROLLED *
                        <input
                           type="date"
                           name="enrolled"
                           value={formData.enrolled}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        COURSE *
                        <select
                        name="course"
                        value={formData.course}
                        onChange={(event) => handleChange(event)}
                        >
                           {courses
                              .filter((course) => course.status_name === "Active")
                              .map((course) =>
                                 <option key={course.id} value={course.id}>{course.name}</option>
                              )
                           }
                        </select>
                        <div className="instruction">Only courses with active status</div>
                     </label>

                     <label>
                        FINAL GRADE
                        <input
                           placeholder="grade"
                           type="number"
                           name="grade"
                           min="0"
                           max="20"
                           value={formData.grade}
                           onChange={(event) => handleChange(event)}
                        />
                        <div className="instruction">From 0 to 20</div>
                     </label>

                     <label>
                        GRADUATED
                        <input
                           type="date"
                           name="graduated"
                           max={getTomorrowDate}
                           value={formData.graduated}
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
                              .filter((status) => status.description.includes("students"))
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


export default UpdateStudentForm;