import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllBacklogData from "../components/read/AllBacklogData";


function BacklogView() {

   const [allBacklogInfo, setAllBacklogInfo] = useState([]);
   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });

   const [userNotAuthorized, setUserNotAuthorized] = useState(false);
   const [error, setError] = useState({});

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData("backlog", "GET");

         if (result.message === "Please, login!") {
            window.location.href = "/";

         } else if (result.type === "WARNING") {
            setUserNotAuthorized(true);
            setError(result);
            
         } else {
            setAllBacklogInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess);
         }; 
      };
      getAllData();
   }, []);

   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");

      if (result.message === "Please, login!") {
         window.location.href = "/";

      } else if (result.type === "WARNING") {
         setUserNotAuthorized(true);
         setError(result);
         
      } else {
         setAllBacklogInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);
         showPageButton(result.paginationLinksAccess);
      }; 
   };

   async function handlePerPageLimit(event) {
      const value = event.target.value;

      await handlePageChange(`backlog/?limit=${value}&offset=${paginationLinks.offset}`);
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
               <AllBacklogData
                  allBacklogInfo = {allBacklogInfo}
               />

               <PaginationButtons
                  handlePageChange = {handlePageChange}
                  paginationLinks = {paginationLinks}
                  paginationButtons = {paginationButtons}
                  handlePerPageLimit = {handlePerPageLimit}
               />
            </div>
         )}
      </>
   );
};


export default BacklogView;