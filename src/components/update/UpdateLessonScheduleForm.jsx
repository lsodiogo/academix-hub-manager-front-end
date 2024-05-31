import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateLessonScheduleForm({ selectedLessonSchedule, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedLessonSchedule) {
      return;
   };

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   const [formData, setFormData] = useState({
      date: FormatDate(selectedLessonSchedule.date).split("/").reverse().join("-"),
      begin: selectedLessonSchedule.begin_time.slice(0, 5),
      end: selectedLessonSchedule.end_time.slice(0, 5),
      description: selectedLessonSchedule.description !== null ? selectedLessonSchedule.description : "",
      course: selectedLessonSchedule.course_id,
      status: selectedLessonSchedule.status_id
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

   const getTomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
     
   function handleChange(event) {
      event.preventDefault();

      const { name, value } = event.target;

      setFieldsRequired(false);
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.date || !formData.begin || !formData.end || !formData.course || !formData.status) {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData(`lessons_schedule/${selectedLessonSchedule.id}`, "PUT", formData);

      setFieldsRequired(false);

      if (result.type === "WARNING") {
         setDialogMessageResult("Same date, same begin time, same end time and same course already exists!");
         setShowDialogMessageResult(true);

      } else {  
         setShowUpdateDialog(false);
   
         setDialogMessageResult("Lesson schedule updated with success!");
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
                     <h1>{selectedLessonSchedule.course_name} -  {FormatDate(selectedLessonSchedule.date)}</h1>

                     {formData.date >= getTomorrowDate ? 
                        <>
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
                        </>
                     :
                        <div className="alert-message">NOT POSSIBLE TO CHANGE DATE & TIME OF FINISHED LESSONS</div>
                     }

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


export default UpdateLessonScheduleForm;