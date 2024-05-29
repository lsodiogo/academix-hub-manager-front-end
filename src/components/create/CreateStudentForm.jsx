import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function CreateStudentForm({ showCreateDialog, setShowCreateDialog }) {

   const [formData, setFormData] = useState({
      name: "",
      surname: "",
      birthdate: "",
      email: "",
      telef: "",
      address: "",
      enrolled: "",
      course: "",
      grade: "",
      graduated: "",
      status: ""
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

      if (!formData.name || !formData.surname || !formData.birthdate || !formData.email || !formData.telef || !formData.address || !formData.enrolled || !formData.course || !formData.status || formData.course === "notanoption" || formData.status === "notanoption") {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData("students", "POST", formData);
      console.log(result);
      setResult(result);

      setFieldsRequired(false);

      if (result.error === "WARNING") {
         setDialogMessageResult("Student already exists!");
         setShowDialogMessageResult(true);

      } else {
         setFormData({
            name: "",
            surname: "",
            birthdate: "",
            email: "",
            telef: "",
            address: "",
            enrolled: "",
            course: "",
            grade: "",
            graduated: "",
            status: ""
         });

         setShowCreateDialog(false);

         setDialogMessageResult("Student created with success!");
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
            <dialog open={showCreateDialog}>
               <div className="dialogScroll">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <h2>Create new student</h2>

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
                              max={getMaxBirthdate()}
                              value={formData.birthdate}
                              onChange={(event) => handleChange(event)}
                           />
                           <p className="instruction">Student must be at least 16 years</p>
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
                              <option value="notanoption">select course</option>
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
                              max={getTomorrowDate}
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
                              <option value="notanoption">select status</option>
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


export default CreateStudentForm;