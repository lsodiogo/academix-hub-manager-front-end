import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function UpdateLessonScheduleForm({ selectedLessonSchedule, showUpdateDialog, setShowUpdateDialog }) {

   if (!selectedLessonSchedule) {
      return;
   };
   console.log(selectedLessonSchedule)


   const [formData, setFormData] = useState({
      date: new Date(selectedLessonSchedule.date).toISOString().split('T')[0],
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
      console.log(result);

      setFieldsRequired(false);

      if (result.error === "WARNING") {
         setDialogMessageResult("Same date, same begin time, same end time and same course already exists!");
         setShowDialogMessageResult(true);

      } else {  
         setShowUpdateDialog(false);
   
         setDialogMessageResult("Lesson schedule updated with success!");
         setShowDialogMessageResult(true);
      };
   };

 
   return (
        <>
            <dialog open={showUpdateDialog}>
               <div className="dialogScroll">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <h2>Update lesson schedule</h2>

                        <label>
                           Date *
                           <input
                              type="date"
                              name="date"
                              min={getTomorrowDate}
                              value={formData.date}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Begin *
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
                           End *
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
                           Description
                           <input
                              type="text"
                              name="description"
                              maxLength="255"
                              value={formData.description}
                              onChange={(event) => handleChange(event)}
                           />
                           <p className="instruction">Max 255 characters</p>
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
                           Status *
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
                           <div className="fieldsRequired">
                           * fields required!
                           </div>
                        }

                        <div>
                           <button type="submit">
                              UPDATE
                           </button>
                           <button type="button" onClick={() => setShowUpdateDialog(false)}>
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
                  <button onClick={() => setShowDialogMessageResult(false)}>OK</button>
               </div>
            </dialog>
        </>
   );
};


export default UpdateLessonScheduleForm;