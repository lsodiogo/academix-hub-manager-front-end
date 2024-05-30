import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllUsersData from "../components/read/AllUsersData";
import DetailedUserData from "../components/read/DetailedUserData";


function UsersView({ pathParams }) {

   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });
  const [showPaginationButtons, setshowPaginationButtons] = useState(true);

  const [cookieInfo, setCookieInfo] = useState({});
  const [userLoggedInInfo, setUserLoggedInInfo] = useState({});
  const [allUsersInfo, setAllUsersInfo] = useState([]);
  const [detailedUserInfo, setDetailedUserInfo] = useState({});

   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});


   useEffect(function() {
      async function checkLoginAndGetData() {
         const resultCookie = await apiService.fetchData("login", "GET");
         console.log(resultCookie);

         setCookieInfo(resultCookie);

         if (pathParams) {
            // GET USER BY ID
            const result = await apiService.fetchData(`users/${pathParams}`, "GET");
            console.log(result);
            
            if (result.error === "WARNING") {
               setUserNotAuthorized(true);
               setError(result);
            };

            setDetailedUserInfo(result);

         } else {
            // GET ALL USERS
            const result = await apiService.fetchData("users", "GET");
            console.log(result);

            if (resultCookie.userCategory === "admin") {
               setAllUsersInfo(result.results);
               setPaginationLinks(result.paginationLinksAccess);
               showPageButton(result.paginationLinksAccess); 
   
            } else {
               setUserLoggedInInfo(result);
               setshowPaginationButtons(false);
            };
         };
      };
      checkLoginAndGetData();
      }, [pathParams]);


      async function handlePageChange(paginationUrl) {
         const result = await apiService.fetchData(paginationUrl, "GET");
         console.log(result);

         setAllUsersInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);
         showPageButton(result.paginationLinksAccess);
      };


      async function handlePerPageLimit(event) {
         const value = event.target.value;
   
         await handlePageChange(`users/?limit=${value}&offset=${paginationLinks.offset}`);
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
            <div>
               <p>{error.error} - {error.message}</p>
            </div>
            
         ) : (
            
            <div>
               {pathParams ? (
                  <DetailedUserData
                     detailedUserInfo={detailedUserInfo}
                  />
            
               ) : (
                  
                  <div>
                     <AllUsersData
                        allUsersInfo={allUsersInfo}
                        userLoggedInInfo={userLoggedInInfo}
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


export default UsersView;