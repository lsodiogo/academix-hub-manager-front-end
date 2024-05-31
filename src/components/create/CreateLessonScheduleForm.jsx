import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function CreateLessonScheduleForm({ showCreateDialog, setShowCreateDialog }) {

   const [formData, setFormData] = useState({
      date: "",
      begin: "",
      end: "",
      description: "",
      course: "",
      status: ""
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

   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.date || !formData.begin || !formData.end || !formData.course || !formData.status || formData.course === "notanoption" || formData.status === "notanoption") {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData("lessons_schedule", "POST", formData);

      setFieldsRequired(false);

      if (result.type === "WARNING") {
         setDialogMessageResult("Same date, same begin time, same end time and same course already exists!");
         setShowDialogMessageResult(true);

      } else {
         setFormData({
            date: "",
            begin: "",
            end: "",
            description: "",
            course: "",
            status: ""
         });
   
         setShowCreateDialog(false);
   
         setDialogMessageResult("Lesson schedule created with success!");
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
                     <h1>CREATE NEW LESSON SCHEDULE</h1>

                     <label>
                        DATE *
                        <input
                           type="date"
                           name="date"
                           min={getTomorrowDate}
                           value={formData.date}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        BEGIN *
                        <input
                           type="time"
                           name="begin"
                           min="09:00"
                           max="19:00"
                           value={formData.begin}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        END *
                        <input
                           type="time"
                           name="end"
                           min="09:00"
                           max="19:00"
                           value={formData.end}
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
                        COURSE *
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
                        <div className="instruction">Only courses with active status</div>
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
                              .filter((status) => status.description.includes("lessons_schedule"))
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


export default CreateLessonScheduleForm;