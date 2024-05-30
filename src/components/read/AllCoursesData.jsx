import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../../services/apiService";

import CreateCourseForm from "../create/CreateCourseForm";
import UpdateCourseForm from "../update/UpdateCourseForm";
import DeleteCourseForm from "../delete/DeleteCourseForm";


function AllCoursesData({ allCoursesInfo, cookieInfo, setshowPaginationButtons }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedCourse, setSelectedCourse] = useState(null);

   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || (cookieInfo.userCategory === "teacher" && cookieInfo.userEmail === item.teacher_email)) {
         return true;
      } else {
         return false;
      };
   };


   const [courses, setCourses] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   useEffect(function() {
      async function getAllCoursesWithNoPaginationForSearchBar() {

         const getTotalCourses = await apiService.fetchData("courses", "GET");
         const resultCourses = await apiService.fetchData(`courses/?limit=${getTotalCourses.totalItems}&offset=0`, "GET");

         setCourses(resultCourses.results);
      };
      getAllCoursesWithNoPaginationForSearchBar();
   }, []);

   useEffect(function() {
      const results = courses.filter((item) =>
         item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
   }, [courses, searchTerm]);

   function handleSearch(event) {
      const inputValue = event.target.value.trim();

      if (inputValue !== "") {
         setSearchTerm(inputValue);
         setshowPaginationButtons(false);
      } else {
         setSearchTerm("");
         setshowPaginationButtons(true);
      };
   };

   
   return (
      <>
         <div className="table-top">
            <input
               type="text"
               placeholder="Search..."
               value={searchTerm}
               onChange={(event) => handleSearch(event)}
            />

            {cookieInfo.userCategory === "admin" &&
               <button onClick={() => setShowCreateDialog(true)}>
                  <span>ADD NEW</span>
                  <img src="./images/add-file.svg" alt="add-file-icon"/>
               </button>
            }
         </div>

         <div className="table-container">
            <table>
               <caption>COURSES</caption>

               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>EDITION</th>
                     <th>TEACHER</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <th>ACTIONS</th>
                     }
                  </tr>
               </thead>
               
               {searchTerm ? (

                  <tbody>
                     {searchResults.length === 0 ? (
                        <tr>
                           <td colSpan={5}>No results found for {searchTerm}</td>
                        </tr>

                     ) : (
                     
                        searchResults.map(item =>
                           <tr key={item.id}>
                              <td>
                                 <Link href={"/courses/" + item.id}>{item.name}</Link>
                              </td>

                              <td>
                                 {item.edition_number}
                              </td>

                              <td>
                                 {userCategoryCheck(item) ? (
                                    <Link href={"/teachers/" + item.teacher_id}>
                                       {item.teacher_name}
                                    </Link>
                                    
                                 ) : (
                                    <span>
                                       {item.teacher_name}
                                    </span>
                                 )}
                              </td>

                              <td>
                                 {item.status_name}
                              </td>

                              {cookieInfo.userCategory === "admin" &&
                                 <td>
                                    <button className="update-button"
                                       onClick={() => {
                                          setSelectedCourse(item);
                                          setShowUpdateDialog(true);
                                       }}
                                    >
                                       <img src="./images/update.svg" alt="update-icon"/>
                                    </button>

                                    <button className="delete-button"
                                       onClick={() => {
                                          setSelectedCourse(item);
                                          setShowDeleteDialog(true);
                                       }}
                                    >
                                       <img src="./images/delete.svg" alt="delete-icon"/>
                                    </button>
                                 </td>
                              }
                           </tr>
                        )
                     )}
                  </tbody>

               ) : (

                  <tbody>
                     {allCoursesInfo.map(item =>
                        <tr key={item.id}>
                           <td>
                              <Link href={"/courses/" + item.id}>{item.name}</Link>
                           </td>

                           <td>
                              {item.edition_number}
                           </td>

                           <td>
                              {userCategoryCheck(item) ? (
                                 <Link href={"/teachers/" + item.teacher_id}>
                                    {item.teacher_name}
                                 </Link>
                                 
                              ) : (
                                 <span>
                                    {item.teacher_name}
                                 </span>
                              )}
                           </td>

                           <td>
                              {item.status_name}
                           </td>

                           {cookieInfo.userCategory === "admin" &&
                              <td>
                                 <button className="update-button"
                                    onClick={() => {
                                       setSelectedCourse(item);
                                       setShowUpdateDialog(true);
                                    }}
                                 >
                                    <img src="./images/update.svg" alt="update-icon"/>
                                 </button>

                                 <button  className="delete-button"
                                    onClick={() => {
                                       setSelectedCourse(item);
                                       setShowDeleteDialog(true);
                                    }}
                                 >
                                    <img src="./images/delete.svg" alt="delete-icon"/>
                                 </button>
                              </td>
                           }
                        </tr>
                     )}
                  </tbody>
               )}
            </table>

            {cookieInfo.userCategory === "admin" &&
               <div>
                  <CreateCourseForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateCourseForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedCourse={selectedCourse}
                  />

                  <DeleteCourseForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedCourse={selectedCourse}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllCoursesData;