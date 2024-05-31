import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllCoursesData from "../components/read/AllCoursesData";
import DetailedCourseData from "../components/read/DetailedCourseData";


function CoursesView({ pathParams }) {

   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });
   const [showPaginationButtons, setshowPaginationButtons] = useState(true);

   const [cookieInfo, setCookieInfo] = useState({});
   const [allCoursesInfo, setAllCoursesInfo] = useState([]);
   const [detailedCourseInfo, setDetailedCourseInfo] = useState({});

   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);
   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});

   useEffect(function() {
      async function checkLoginAndGetData() {
         const resultCookie = await apiService.fetchData("login", "GET");

         setCookieInfo(resultCookie);
         
         if (pathParams) {
            // GET COURSE BY ID
            const result = await apiService.fetchData(`courses/${pathParams}`, "GET");

            if (result.message === "Please, login!") {
               window.location.href = "/";

            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);

            } else {
               setDetailedCourseInfo(result);
            };

            if (!result.description) {
               setHideWhenDataNull(true);
            };

         } else {
            // GET ALL COURSES
            const result = await apiService.fetchData("courses", "GET");

            if (result.message === "Please, login!") {
               window.location.href = "/";
   
            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
               
            } else {
               setAllCoursesInfo(result.results);
               setPaginationLinks(result.paginationLinksAccess);
               showPageButton(result.paginationLinksAccess);
            }; 
         };
      };
      checkLoginAndGetData();
      }, [pathParams]);

      async function handlePageChange(paginationUrl) {
         const result = await apiService.fetchData(paginationUrl, "GET");

         if (result.message === "Please, login!") {
            window.location.href = "/";

         } else if (result.type === "WARNING") {
            setUserNotAuthorized(true);
            setError(result);
            
         } else {
            setAllCoursesInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess);
         }; 
      };

      async function handlePerPageLimit(event) {
         const value = event.target.value;
   
         await handlePageChange(`courses/?limit=${value}&offset=${paginationLinks.offset}`);
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

      useEffect(() => {
         const fetchLatestResults = async () => {
           const result = await apiService.fetchData("courses", "GET");
     
           setAllCoursesInfo(result.results);
           setPaginationLinks(result.paginationLinksAccess);
           showPageButton(result.paginationLinksAccess);
         };
     
         fetchLatestResults();
      }, []);


   return (
      <>
         {userNotAuthorized ? (
            <div className="warning-message">
               <div>{error.type}: {error.message}</div>
            </div>
            
         ) : (
            
            <div>
               {pathParams ? (
                  <DetailedCourseData
                     detailedCourseInfo={detailedCourseInfo}
                     hideWhenDataNull={hideWhenDataNull}
                     cookieInfo={cookieInfo}
                   />
            
               ) : (
                  
                  <div>
                     <AllCoursesData
                        allCoursesInfo={allCoursesInfo}
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


export default CoursesView;