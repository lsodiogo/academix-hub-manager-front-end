import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../../services/apiService";

import CreateTeacherForm from "../create/CreateTeacherForm";
import UpdateTeacherForm from "../update/UpdateTeacherForm";
import DeleteTeacherForm from "../delete/DeleteTeacherForm";


function AllTeachersData({ allTeachersInfo, cookieInfo, setshowPaginationButtons }) {

   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [selectedTeacher, setSelectedTeacher] = useState(null);
   

   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || cookieInfo.userCategory === "teacher") {
         return true;
      } else {
         return false;
      };
   };


   const [teachers, setTeachers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   useEffect(function() {
      async function getAllTeachersWithNoPaginationForSearchBar() {

         const getTotalTeachers = await apiService.fetchData("teachers", "GET");
         const resultTeachers = await apiService.fetchData(`teachers/?limit=${getTotalTeachers.totalItems}&offset=0`, "GET");

         setTeachers(resultTeachers.results);
      };
      getAllTeachersWithNoPaginationForSearchBar();
   }, []);

   useEffect(function() {
      const results = teachers.filter((item) =>
         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.surname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
   }, [teachers, searchTerm]);

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
               <caption>TEACHERS</caption>

               <thead>
                  <tr>
                     <th>NAME</th>
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
                           <td colSpan={3}>No results found for {searchTerm}</td>
                        </tr>

                     ) : (

                        searchResults.map(item =>
                           <tr key={item.id}>
                              <td>
                                 {userCategoryCheck(item) ? (
                                    <Link href={"/teachers/" + item.id}>
                                       {item.name} {item.surname}
                                    </Link>
                                    
                                 ) : (
                                    
                                    <span>
                                       {item.name} {item.surname}
                                    </span>
                                 )}
                              </td>

                              <td>
                                 {item.status_name}
                              </td>

                              {cookieInfo.userCategory === "admin" &&
                                 <>
                                 <td>
                                    <button className="update-button"
                                       onClick={() => {
                                          setSelectedTeacher(item);
                                          setShowUpdateDialog(true);
                                       }}
                                    >
                                       <img src="../images/update.svg" alt="update-icon"/>
                                    </button>
                                 </td>
                                    
                                 <td>
                                    <button  className="delete-button"
                                       onClick={() => {
                                          setSelectedTeacher(item);
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
                     {allTeachersInfo.map(item =>
                        <tr key={item.id}>
                           <td>
                              {userCategoryCheck(item) ? (
                                 <Link href={"/teachers/" + item.id}>
                                    {item.name} {item.surname}
                                 </Link>
                                 
                              ) : (
                                 
                                 <span>
                                    {item.name} {item.surname}
                                 </span>
                              )}
                           </td>

                           <td>
                              {item.status_name}
                           </td>

                           {cookieInfo.userCategory === "admin" &&
                              <>
                              <td>
                                 <button className="update-button"
                                    onClick={() => {
                                       setSelectedTeacher(item);
                                       setShowUpdateDialog(true);
                                    }}
                                 >
                                    <img src="../images/update.svg" alt="update-icon"/>
                                 </button>
                              </td>
                              
                              <td>
                                 <button  className="delete-button"
                                    onClick={() => {
                                       setSelectedTeacher(item);
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
                  <CreateTeacherForm
                     showCreateDialog={showCreateDialog}
                     setShowCreateDialog={setShowCreateDialog}
                  />

                  <UpdateTeacherForm
                     showUpdateDialog={showUpdateDialog}
                     setShowUpdateDialog={setShowUpdateDialog}
                     selectedTeacher={selectedTeacher}
                  />

                  <DeleteTeacherForm
                     showDeleteDialog={showDeleteDialog}
                     setShowDeleteDialog={setShowDeleteDialog}
                     selectedTeacher={selectedTeacher}
                  />
               </div>
            }
         </div>
      </>
   );
};


export default AllTeachersData;