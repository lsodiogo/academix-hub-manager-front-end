import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllLessonsScheduleData from "../components/read/AllLessonsScheduleData";
import DetailedLessonScheduleData from "../components/read/DetailedLessonScheduleData";


function LessonsScheduleView({ pathParams }) {

   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });
   const [showPaginationButtons, setshowPaginationButtons] = useState(true);

   const [cookieInfo, setCookieInfo] = useState({});

   const [allLessonsScheduleInfo, setAllLessonsScheduleInfo] = useState([]);
   const [detailedLessonScheduleInfo, setDetailedLessonScheduleInfo] = useState({});

   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);
   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});


   useEffect(function() {
      async function checkLoginAndGetData() {
         const resultCookie = await apiService.fetchData("login", "GET");
         console.log(resultCookie);

         setCookieInfo(resultCookie);
         
         if (pathParams) {
            // GET LESSON SCHEDULE BY ID
            const result = await apiService.fetchData(`lessons_schedule/${pathParams}`, "GET");
            console.log(result);

            if (result.message === "Please, login!") {
               window.location.href = "/";

            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);

            }else {
               setDetailedLessonScheduleInfo(result);
            };

            if (!result.description) {
               setHideWhenDataNull(true);
            };

         } else {
            // GET ALL LESSONS SCHEDULE
            const result = await apiService.fetchData("lessons_schedule", "GET");
            console.log(result);

            if (result.message === "Please, login!") {
               window.location.href = "/";
   
            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
               
            } else {
               setAllLessonsScheduleInfo(result.results);
               setPaginationLinks(result.paginationLinksAccess);
               showPageButton(result.paginationLinksAccess);
            };
         };
      };
      checkLoginAndGetData();
      }, [pathParams]);


      async function handlePageChange(paginationUrl) {
         const result = await apiService.fetchData(paginationUrl, "GET");
         console.log(result);

         if (result.message === "Please, login!") {
            window.location.href = "/";

         } else if (result.type === "WARNING") {
            setUserNotAuthorized(true);
            setError(result);
            
         } else {
            setAllLessonsScheduleInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess);
         };
      };


      async function handlePerPageLimit(event) {
         const value = event.target.value;
   
         await handlePageChange(`lessons_schedule/?limit=${value}&offset=${paginationLinks.offset}`);
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
         {userNotAuthorized ? (
            <div className="warning-message">
               <div>{error.type}: {error.message}</div>
            </div>
            
         ) : (
            
            <div>
               {pathParams ? (
                  <DetailedLessonScheduleData
                     detailedLessonScheduleInfo={detailedLessonScheduleInfo}
                     hideWhenDataNull={hideWhenDataNull}
                  />
            
               ) : (
                  
                  <div>
                     <AllLessonsScheduleData
                        allLessonsScheduleInfo={allLessonsScheduleInfo}
                        cookieInfo={cookieInfo}
                        setshowPaginationButtons={setshowPaginationButtons}
                     />

                     {showPaginationButtons && 
                        <PaginationButtons
                           handlePageChange={handlePageChange}
                           paginationLinks={paginationLinks}
                           paginationButtons={paginationButtons}
                           handlePerPageLimit={handlePerPageLimit}
                        />
                     }
                  </div>
               )}
            </div>
         )}
      </>
   );
};


export default LessonsScheduleView;