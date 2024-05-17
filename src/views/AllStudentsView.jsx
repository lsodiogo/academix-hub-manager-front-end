import { Link } from "wouter";
import { useState, useEffect } from "react";

import apiService from "../services/apiService";

function AllStudentView() {

   const [userLoggedIn, setUserLoggedIn] = useState({});
   const [studentInfo, setStudentInfo] = useState([]);
   const [paginationLinks, setPaginationLinks] = useState({});

   const [showFirstPageButton, setShowFirstPageButton] = useState(true);
   const [showPreviousPageButton, setShowPreviousPageButton] = useState(true);
   const [showNextPageButton, setShowNextPageButton] = useState(true);
   const [showLastPageButton, setShowLastPageButton] = useState(true);


   useEffect(function() {
      (async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         console.log(result);

         setUserLoggedIn(result);
      })();
   }, []);


   useEffect(function() {
      (async function getAllData() {

         const result = await apiService.fetchData("students", "GET");

         console.log(result);

         setStudentInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);

         await showPageButton(result.paginationLinksAccess);
      })();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");

      console.log(result);

      setStudentInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);

      await showPageButton(result.paginationLinksAccess);
   };


   async function handlePerPageChange(event) {
      const value = event.target.value;

      await handlePageChange(`students/?limit=${value}&offset=${paginationLinks.offset}`);
   };


   async function showPageButton(paginationLinks) {

      if (paginationLinks.firstPage === null) {
         setShowFirstPageButton(false);
      } else {
         setShowFirstPageButton(true);
      };

      if (paginationLinks.previousPage === null) {
         setShowPreviousPageButton(false);
      } else {
         setShowPreviousPageButton(true);
      };

      if (paginationLinks.nextPage === null) {
         setShowNextPageButton(false);
      } else {
         setShowNextPageButton(true);
      };

      if (paginationLinks.lastPage === null) {
         setShowLastPageButton(false);
      }  else {
         setShowLastPageButton(true);
      };
   };

   function userCategoryCheck(item) {
      if (userLoggedIn.userCategory === "admin" || userLoggedIn.userCategory === "teacher" || (userLoggedIn.userCategory === "student" && userLoggedIn.userEmail === item.email)) {
         return true;
      } else {
         return false;
      };
   };

   
   return (
      <>
         <h1>STUDENTS</h1>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                  </tr>
               </thead>
               <tbody>
                  {studentInfo
                     .map(item =>
                        <tr key={item.id}>
                           <td>
                              {userCategoryCheck(item) ? (
                                 <Link href={"/students/" + item.id}>{item.name} {item.surname}</Link>
                              ) : (
                                 <span>{item.name} {item.surname}</span>
                              )}
                           </td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
         
         <div>
            {showFirstPageButton && <button onClick={() => handlePageChange(paginationLinks.firstPage)}>FIRST PAGE</button>}
            {showPreviousPageButton && <button onClick={() => handlePageChange(paginationLinks.previousPage)}>PREVIOUS</button> }
            {showNextPageButton && <button onClick={() => handlePageChange(paginationLinks.nextPage)}>NEXT</button> }
            {showLastPageButton && <button onClick={() => handlePageChange(paginationLinks.lastPage)}>LAST PAGE</button> }

            <select onChange={handlePerPageChange}>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="15">15</option>
               <option value="20">20</option>
            </select>
         </div>
      </>
   );

};


export default AllStudentView;