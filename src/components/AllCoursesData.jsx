import { useEffect, useState } from "react";
import { Link } from "wouter";

import apiService from "../services/apiService";


function AllCoursesData({ allCoursesInfo }) {

   const [showDialog, setShowDialog] = useState(false);

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

   useEffect(function() {
      async function getAllData() {

         const getTotalTeachers = await apiService.fetchData("teachers", "GET");
         const resultTeachers = await apiService.fetchData(`teachers/?limit=${getTotalTeachers.totalItems}&offset=0`, "GET");

         setTeachers(resultTeachers.results);

         const getTotalStatus = await apiService.fetchData("status", "GET");
         const resultStatus = await apiService.fetchData(`status/?limit=${getTotalStatus.totalItems}&offset=0`, "GET");

         setStatus(resultStatus.results);
      };
      getAllData();
   }, []);

   
   //
   const weekDayArray = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
   const getTomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
   const checkWeekDay = weekDayArray[new Date(getTomorrowDate).getDay()];
   if (checkWeekDay === "SATURDAY" || checkWeekDay === "SUNDAY") {
      console.log("YAY, WEEKEND");
   };
   //


   function handleChange(event) {
      event.preventDefault();

      const { name, value } = event.target;
      
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };


   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.name && !formData.edition && !formData.duration && !formData.start && !formData.finish && !formData.teacher && !formData.status) {
         alert("FIELDS REQUIRED");
         return;
      };
      
      const result = await apiService.fetchData("courses", "POST", formData);
      console.log("SUGGESTION ACCEPTED: ", result);

      // CONDITION TO CLEAN OUTPUT //
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
  };

   
   return (
      <>
         <h2>COURSES</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Edition</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allCoursesInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           <Link href={"/course/" + item.id}>{item.name}</Link>
                        </td>

                        <td>
                           {item.edition_number}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>

            <button onClick={() => setShowDialog(true)}>
               Add New
            </button>

            <dialog open={showDialog}>
               <form onSubmit={handleSubmit}>
                  <fieldset>
                     <h2>Create new course</h2>

                     <label>
                        Name:
                        <input
                           placeholder="ex: Full Stack Web Development"
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Edition number:
                        <input
                           placeholder="ex: 00012"
                           type="number"
                           name="edition"
                           value={formData.edition}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Duration:
                        <input
                           placeholder="ex: 320"
                           type="number"
                           name="duration"
                           value={formData.duration}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Start:
                        <input
                           type="date"
                           name="start"
                           min={getTomorrowDate}
                           value={formData.start}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Finish:
                        <input
                           type="date"
                           name="finish"
                           min={formData.start}
                           value={formData.finish}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Description:
                        <input
                           type="text"
                           name="description"
                           value={formData.description}
                           onChange={(event) => handleChange(event)}
                        />
                     </label>

                     <label>
                        Teacher:
                        <select
                          name="teacher"
                          value={formData.teacher}
                          onChange={(event) => handleChange(event)}
                        >
                           <option>select teacher</option>
                           {teachers
                              .filter((teacher) => teacher.status_name === "Active")
                              .map((teacher) =>
                                 <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                              )
                           }
                        </select>
                     </label>

                     <label>
                        Status:
                        <select
                          name="status"
                          value={formData.status}
                          onChange={(event) => handleChange(event)}
                        >
                           <option>select status</option>
                           {status
                              .filter((status) => status.description.includes("courses"))
                              .map((status) =>
                                 <option key={status.id} value={status.id}>{status.name}</option>
                              )
                           }
                        </select>
                     </label>

                     <button type="submit">
                        Create
                     </button>
                     <button type="button" onClick={() => setShowDialog(false)}>
                        Cancel
                     </button>
                  </fieldset>
               </form>
            </dialog>
            
         </div>
      </>
   );
};


export default AllCoursesData;