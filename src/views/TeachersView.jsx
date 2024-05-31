import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllTeachersData from "../components/read/AllTeachersData";
import DetailedTeacherData from "../components/read/DetailedTeacherData";


function TeachersView({ pathParams }) {

   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });
   const [showPaginationButtons, setshowPaginationButtons] = useState(true);

   const [cookieInfo, setCookieInfo] = useState({});
   const [allTeachersInfo, setAllTeachersInfo] = useState([]);
   const [detailedTeacherInfo, setDetailedTeacherInfo] = useState({});

   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});


   useEffect(function() {
      async function checkLoginAndGetData() {
         const resultCookie = await apiService.fetchData("login", "GET");
         console.log(resultCookie);

         setCookieInfo(resultCookie);

         if (pathParams) {
            // GET TEACHER BY ID
            const result = await apiService.fetchData(`teachers/${pathParams}`, "GET");
            console.log(result);
            
            if (result.message === "Please, login!") {
               window.location.href = "/";

            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
               
            }else {
               setDetailedTeacherInfo(result);
            };

         } else {
            // GET ALL TEACHERS
            const result = await apiService.fetchData("teachers", "GET");
            console.log(result);

            if (result.message === "Please, login!") {
               window.location.href = "/";
   
            } else if (result.type === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
               
            } else {
               setAllTeachersInfo(result.results);
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
            setAllTeachersInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess);
         };
      };


      async function handlePerPageLimit(event) {
         const value = event.target.value;
   
         await handlePageChange(`teachers/?limit=${value}&offset=${paginationLinks.offset}`);
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
                  <DetailedTeacherData
                     detailedTeacherInfo={detailedTeacherInfo}
                  />
            
               ) : (
                  
                  <div>
                     <AllTeachersData
                        allTeachersInfo={allTeachersInfo}
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


export default TeachersView;