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
         console.log(result);
         
         if (result.error === "WARNING") {
            setUserNotAuthorized(true);
            setError(result);
         };

         setAllBacklogInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);
         showPageButton(result.paginationLinksAccess);
      };
      getAllData();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");
      console.log(result);
      
      setAllBacklogInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);
      showPageButton(result.paginationLinksAccess); 
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
         {userNotAuthorized ? 
            (<div>
               <p>{error.error} - {error.message}</p>
            </div>)

            :
         
            (<div>
               <AllBacklogData
                  allBacklogInfo = {allBacklogInfo}
               />

               <PaginationButtons
                  handlePageChange = {handlePageChange}
                  paginationLinks = {paginationLinks}
                  paginationButtons = {paginationButtons}
                  handlePerPageLimit = {handlePerPageLimit}
               />
            </div>)
         }
      </>
   );
};


export default BacklogView;