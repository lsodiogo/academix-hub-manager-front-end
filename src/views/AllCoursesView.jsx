import { Link } from "wouter";
import { useState, useEffect } from "react";

import apiService from "../services/apiService";

function AllStudentView() {

   const [hideChangeLimitButton, setHideChangeLimitButton] = useState(false);
   const [courseInfo, setCourseInfo] = useState([]);
   const [paginationLinks, setPaginationLinks] = useState({});

   const [showFirstPageButton, setShowFirstPageButton] = useState(true);
   const [showPreviousPageButton, setShowPreviousPageButton] = useState(true);
   const [showNextPageButton, setShowNextPageButton] = useState(true);
   const [showLastPageButton, setShowLastPageButton] = useState(true);


   useEffect(function() {
      (async function getAllData() {

         const result = await apiService.fetchData("courses", "GET");

         console.log(result);

         setCourseInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);

         await showPageButton(result.paginationLinksAccess);

         if (result.totalItems > result.paginationLinksAccess.limit) {
            setHideDataNullField(true);
         };
      })();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");

      console.log(result);

      setCourseInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);

      await showPageButton(result.paginationLinksAccess);
   };


   async function handleLimitChange(event) {
      const value = event.target.value;

      await handlePageChange(`courses/?limit=${value}&offset=${paginationLinks.offset}`);
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

   
   return (
      <>
         <h1>COURSES</h1>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                  </tr>
               </thead>
               <tbody>
                  {courseInfo
                     .map(item =>
                        <tr key={item.id}>
                           <td>
                              <Link href={"/courses/" + item.id}>{item.name}</Link>
                           </td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
         
         {hideChangeLimitButton && <div>
            {showFirstPageButton && <button onClick={() => handlePageChange(paginationLinks.firstPage)}>FIRST PAGE</button>}
            {showPreviousPageButton && <button onClick={() => handlePageChange(paginationLinks.previousPage)}>PREVIOUS</button> }
            {showNextPageButton && <button onClick={() => handlePageChange(paginationLinks.nextPage)}>NEXT</button> }
            {showLastPageButton && <button onClick={() => handlePageChange(paginationLinks.lastPage)}>LAST PAGE</button> }

            <select onChange={handleLimitChange}>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="15">15</option>
               <option value="20">20</option>
            </select>
         </div>}
      </>
   );

};


export default AllStudentView;