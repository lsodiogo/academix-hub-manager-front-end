import { useState, useEffect } from "react";
import { Link } from "wouter";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllStudentData from "../components/AllStudentsData";


function AllStudentView() {

   const [userLoggedIn, setUserLoggedIn] = useState({});
   const [allStudentsInfo, setAllStudentsInfo] = useState([]);
   const [allInfoCount, setAllInfoCount] = useState({});
   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });


   useEffect(function() {
      async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         console.log(result);

         setUserLoggedIn(result);
      };
      checkLogin();
   }, []);


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData("students", "GET");

         console.log(result);

         setAllInfoCount(result.totalItems);
         setAllStudentsInfo(result.results);
         setPaginationLinks(result.paginationLinksAccess);

         await showPageButton(result.paginationLinksAccess);
      };
      getAllData();
   }, []);


   async function handlePageChange(paginationUrl) {

      const result = await apiService.fetchData(paginationUrl, "GET");

      console.log(result);

      setAllStudentsInfo(result.results);
      setPaginationLinks(result.paginationLinksAccess);

      await showPageButton(result.paginationLinksAccess);
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
         <AllStudentData
            allStudentsInfo = {allStudentsInfo}
            userLoggedIn = {userLoggedIn}
         />
         
         {allInfoCount > paginationLinks.limit &&
            <PaginationButtons
               handlePageChange = {handlePageChange}
               paginationLinks = {paginationLinks}
               paginationButtons = {paginationButtons}
               handlePerPageLimit = {handlePerPageLimit}
            />
         }
      </>
   );
};


export default AllStudentView;