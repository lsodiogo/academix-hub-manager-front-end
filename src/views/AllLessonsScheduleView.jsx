import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllLessonsScheduleData from "../components/AllLessonsScheduleData";


function AllLessonsScheduleView() {

   const [allLessonsScheduleInfo, setAllLessonsScheduleInfo] = useState([]);
   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData("lessons_schedule", "GET");
         console.log(result);

         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };

         setAllLessonsScheduleInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);
         showPageButton(result.paginationLinksAccess);
      };
      getAllData();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");
      console.log(result);
      
      setAllLessonsScheduleInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);
      showPageButton(result.paginationLinksAccess);
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
         <AllLessonsScheduleData
            allLessonsScheduleInfo = {allLessonsScheduleInfo}
         />
         
         <PaginationButtons
            handlePageChange = {handlePageChange}
            paginationLinks = {paginationLinks}
            paginationButtons = {paginationButtons}
            handlePerPageLimit = {handlePerPageLimit}
         />
      </>
   );
};


export default AllLessonsScheduleView;