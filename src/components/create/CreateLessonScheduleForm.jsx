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
   const [result, setResult] = useState({});
   
   const [courses, setCourses] = useState([]);
   const [status, setStatus] = useState([]);
   /* const [allLessonsScheduleInfo, setAllLessonsScheduleInfo] = useState([]); */
   
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


   /* useEffect(function() {
      async function getAllLessonsSchedule() {

         const getTotalLessonsSchedule = await apiService.fetchData("lessons_schedule", "GET");
         const resultLessonsSchedule = await apiService.fetchData(`lessons_schedule/?limit=${getTotalLessonsSchedule.totalItems}&offset=0`, "GET");

         setAllLessonsScheduleInfo(resultLessonsSchedule.results);
      };
      getAllLessonsSchedule();
   }, []); */


   function handleChange(event) {
      event.preventDefault();
      
      const { name, value } = event.target;
      
      setFieldsRequired(false);
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
   };

   
   const getTomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

   /* if (allLessonsScheduleInfo) {
      for (let i = 0; i < allLessonsScheduleInfo.length; i++) {
         const existingLesson = allLessonsScheduleInfo[i];


         if ((formData.date === existingLesson.date) &&
            (formData.begin >= existingLesson.begin_time && formData.begin <= existingLesson.end_time) ||
            (formData.end >= existingLesson.begin_time && formData.end <= existingLesson.end_time)
         ) {
            console.log(existingLesson.id)
         };

         console.log("diferente");
      };
   }; */


   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.date || !formData.begin || !formData.end || !formData.course || !formData.status || formData.course === "notanoption" || formData.status === "notanoption") {
         setFieldsRequired(true);
         return;
      };
      
      const result = await apiService.fetchData("lessons_schedule", "POST", formData);
      console.log(result);
      setResult(result);

      setFieldsRequired(false);

      if (result.error === "WARNING") {
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
                        <h2>Create new lesson schedule</h2>

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
                              placeholder="description"
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
                              <option value="notanoption">select course</option>
                              {courses
                                 .filter((course) => course.status_name === "Active")
                                 .map((course) =>
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                 )
                              }
                           </select>
                           <p className="instruction">Only courses with active status</p>
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