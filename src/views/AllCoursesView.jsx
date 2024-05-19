import { Link } from "wouter";
import { useState, useEffect } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllCoursesData from "../components/AllCoursesData";


function AllStudentView() {

   const [allCoursesInfo, setAllCoursesInfo] = useState([]);
   const [allInfoCount, setAllInfoCount] = useState({});
   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData("courses", "GET");

         console.log(result);

         setAllInfoCount(result.totalItems);
         setAllCoursesInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);

         await showPageButton(result.paginationLinksAccess);
      };
      getAllData();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");

      console.log(result);

      setAllCoursesInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);

      await showPageButton(result.paginationLinksAccess);
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


   return (
      <>
         <AllCoursesData
            allCoursesInfo = {allCoursesInfo}
         />
         
         {allInfoCount > paginationLinks.limit && <PaginationButtons
            handlePageChange = {handlePageChange}
            paginationLinks = {paginationLinks}
            paginationButtons = {paginationButtons}
            handlePerPageLimit = {handlePerPageLimit}
         />}
      </>
   );
};


export default AllStudentView;