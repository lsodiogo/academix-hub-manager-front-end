import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateStudentForm({ selectedStudent, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedStudent) {
      return;
   };

   const [formData, setFormData] = useState({
      name: selectedStudent.name,
      surname: selectedStudent.surname,
      birthdate: new Date(selectedStudent.birthdate).toISOString().split('T')[0],
      email: selectedStudent.email,
      telef: selectedStudent.telef,
      address: selectedStudent.address,
      enrolled: new Date(selectedStudent.enrolled_at).toISOString().split('T')[0],
      course: selectedStudent.course_id,
      grade: selectedStudent.grade !== null ? selectedStudent.grade : "",
      graduated: selectedStudent.graduated_at !== null ? new Date(selectedStudent.graduated_at).toISOString().split('T')[0] : "",
      status: selectedStudent.status_id
   });
   const [result, setResult] = useState({});
   
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


   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.name || !formData.surname || !formData.birthdate || !formData.email || !formData.telef || !formData.address || !formData.enrolled || !formData.course || !formData.status) {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData(`students/${selectedStudent.id}`, "PUT", formData);
      console.log(result);
      setResult(result);

      setFieldsRequired(false);

      if (result.error === "WARNING") {
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
                        <h2>Update student {selectedStudent.name} {selectedStudent.surname}</h2>

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
                           Enrolled *
                           <input
                              type="date"
                              name="enrolled"
                              value={formData.enrolled}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Course *
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
                        </label>

                        <label>
                           Final Grade
                           <input
                              placeholder="grade"
                              type="number"
                              name="grade"
                              min="0"
                              max="20"
                              value={formData.grade}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Graduated
                           <input
                              type="date"
                              name="graduated"
                              value={formData.graduated}
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
                                 .filter((status) => status.description.includes("students"))
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


export default UpdateStudentForm;