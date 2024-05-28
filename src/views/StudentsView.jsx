import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllStudentsData from "../components/read/AllStudentsData";
import DetailedStudentData from "../components/read/DetailedStudentData";


function StudentsView({ pathParams }) {

   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });

   const [cookieInfo, setCookieInfo] = useState({});
   const [allStudentsInfo, setAllStudentsInfo] = useState([]);
   const [detailedStudentInfo, setDetailedStudentInfo] = useState({});

   const [hideWhenDataNull, setHideWhenDataNull] = useState(false); 
   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});


   useEffect(function() {
      async function checkLoginAndGetData() {
         const resultCookie = await apiService.fetchData("login", "GET");
         console.log(resultCookie);

         setCookieInfo(resultCookie);

         if (pathParams) {
            // GET STUDENT BY ID
            const result = await apiService.fetchData(`students/${pathParams}`, "GET");
            console.log(result);
            
            if (result.error === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
            };

            setDetailedStudentInfo(result);

            if (!result.grade || !result.graduated_at) {
               setHideWhenDataNull(true);
            };

         } else {
            // GET ALL STUDENTS
            const result = await apiService.fetchData("students", "GET");
            console.log(result);

            if (result.error === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
            };

            setAllStudentsInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess);
         };
      };
      checkLoginAndGetData();
      }, [pathParams]);


      async function handlePageChange(paginationUrl) {
         const result = await apiService.fetchData(paginationUrl, "GET");
         console.log(result);

         setAllStudentsInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);
         showPageButton(result.paginationLinksAccess);
      };


      async function handlePerPageLimit(event) {
         const value = event.target.value;
   
         await handlePageChange(`students/?limit=${value}&offset=${paginationLinks.offset}`);
      };


      function showPageButton(paginationLinks) {
         const buttons = {
            firstPage: paginationLinks.firstPage !== null,
            previousPage: paginationLinks.previousPage !== null,
            nextPage: paginationLinks.nextPage !== null,
            lastPage: paginationLinks.lastPage !== null,
         };
        
         setPaginationButtons(buttons);
      };


   return (
      <>
         {userNotAuthorized ? 
            (<div>
               <p>{error.error} - {error.message}</p>
            </div>)
            
            :
            
            (<div>
               {pathParams ?
                  (<DetailedStudentData
                     detailedStudentInfo={detailedStudentInfo}
                     hideWhenDataNull={hideWhenDataNull}
                  />)
            
                  :
                  
                  (<div>
                     <AllStudentsData
                        allStudentsInfo={allStudentsInfo}
                        cookieInfo={cookieInfo}
                     />

                     <PaginationButtons
                        handlePageChange={handlePageChange}
                        paginationLinks={paginationLinks}
                        paginationButtons={paginationButtons}
                        handlePerPageLimit={handlePerPageLimit}
                     />
                  </div>)
               }
            </div>)
         }
      </>
   );
};


export default StudentsView;