import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../../services/apiService";

import CreateStudentForm from "../create/CreateStudentForm";
import UpdateStudentForm from "../update/UpdateStudentForm";
import DeleteStudentForm from "../delete/DeleteStudentForm";


function AllStudentsData({ allStudentsInfo, cookieInfo, setshowPaginationButtons }) {
   
   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState(null);


   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || cookieInfo.userCategory === "teacher" || (cookieInfo.userCategory === "student" && cookieInfo.userEmail === item.email)) {
         return true;
      } else {
         return false;
      };
   };


   const [students, setStudents] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   useEffect(function() {
      async function getAllStudentsWithNoPaginationForSearchBar() {

         const getTotalStudents = await apiService.fetchData("students", "GET");
         const resultStudents = await apiService.fetchData(`students/?limit=${getTotalStudents.totalItems}&offset=0`, "GET");

         setStudents(resultStudents.results);
      };
      getAllStudentsWithNoPaginationForSearchBar();
   }, []);

   useEffect(function() {
      const results = students.filter((item) =>
         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.surname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
   }, [students, searchTerm]);

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
               placeholder="search name"
               value={searchTerm}
               onChange={(event) => handleSearch(event)}
            />

            {cookieInfo.userCategory === "admin" &&
               <button onClick={() => setShowCreateDialog(true)}>
                  <span>ADD NEW</span>
                  <img src="../images/add-user.svg" alt="add-user-icon"/>
               </button>
            }
         </div>

         <div className="table-container">
            <table>
               <caption>STUDENTS</caption>

               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>COURSE</th>
                     <th>STATUS</th>
                     {cookieInfo.userCategory === "admin" &&
                        <><th>UPDATE</th>
                        <th>DELETE</th></>
                     }
                  </tr>
               </thead>
               
               {searchTerm ? (
                  <tbody>
                     {searchResults.length === 0 ? (
                        <tr>
                           <td colSpan={4}>No results found for {searchTerm}</td>
                        </tr>

                     ) : (

                        searchResults.map(item =>
                           <tr key={item.id}>
                              <td>
                                 {userCategoryCheck(item) ? (
                                    <Link href={"/students/" + item.id}>
                                       {item.name} {item.surname}
                                    </Link>

                                 ) : (

                                    <span>
                                       {item.name} {item.surname}
                                    </span>
                                 )}
                              </td>

                              <td>
                                 <Link href={"/courses/" + item.course_id}>
                                    {item.course_name}
                                 </Link>
                              </td>

                              <td>
                                 {item.status_name}
                              </td>
                              
                              {cookieInfo.userCategory === "admin" &&
                                 <>
                                 <td>
                                    <button className="update-button"
                                       onClick={() => {
                                          setSelectedStudent(item);
                                          setShowUpdateDialog(true);
                                       }}
                                    >
                                       <img src="../images/update.svg" alt="update-icon"/>
                                    </button>
                                 </td>
                                 
                                 <td>
                                    <button  className="delete-button"
                                       onClick={() => {
                                          setSelectedStudent(item);
                                          setShowDeleteDialog(true);
                                       }}
                                    >
                                       <img src="../images/delete.svg" alt="delete-icon"/>
                                    </button>
                                 </td>
                                 </>
                              }
                           </tr>
                        )
                     )}
                  </tbody>

               ) : (

                  <tbody>
                     {allStudentsInfo.map(item =>
                        <tr key={item.id}>
                           <td>
                              {userCategoryCheck(item) ? (
                                 <Link href={"/students/" + item.id}>
                                    {item.name} {item.surname}
                                 </Link>

                              ) : (

                                 <span>
                                    {item.name} {item.surname}
                                 </span>
                              )}
                           </td>

                           <td>
                              <Link href={"/courses/" + item.course_id}>
                                 {item.course_name}
                              </Link>
                           </td>

                           <td>
                              {item.status_name}
                           </td>
                           
                           {cookieInfo.userCategory === "admin" &&
                              <>
                              <td>
                                 <button className="update-button"
                                    onClick={() => {
                                       setSelectedStudent(item);
                                       setShowUpdateDialog(true);
                                    }}
                                 >
                                    <img src="../images/update.svg" alt="update-icon"/>
                                 </button>
                              </td>
                              
                              <td>
                                 <button  className="delete-button"
                                    onClick={() => {
                                       setSelectedStudent(item);
                                       setShowDeleteDialog(true);
                                    }}
                                 >
                                    <img src="../images/delete.svg" alt="delete-icon"/>
                                 </button>
                              </td>
                              </>
                           }
                        </tr>
                     )}
                  </tbody>
               )}
            </table>

            {cookieInfo.userCategory === "admin" &&
               <div>
                  <CreateStudentForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateStudentForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedStudent={selectedStudent}
                  />

                  <DeleteStudentForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedStudent={selectedStudent}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllStudentsData;