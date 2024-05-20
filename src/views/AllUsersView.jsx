import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import PaginationButtons from "../components/PaginationButtons";
import AllUsersData from "../components/AllUsersData";


function AllUsersView() {

   const [userLoggedIn, setUserLoggedIn] = useState({});
   const [allUsersInfo, setAllUsersInfo] = useState([]);
   const [userInfo, setUserInfo] = useState({});
   const [paginationLinks, setPaginationLinks] = useState({});
   const [paginationButtons, setPaginationButtons] = useState({
      firstPage: true,
      previousPage: true,
      nextPage: true,
      lastPage: true
   });
   const [showPaginationButtons, setshowPaginationButtons] = useState(true);


   useEffect(function() {
      async function checkLoginAndGetData() {

         const resultCookie = await apiService.fetchData("login", "GET");
         console.log(resultCookie);

         setUserLoggedIn(resultCookie);


         const result = await apiService.fetchData("users", "GET");
         console.log(result);

         if (resultCookie.userCategory === "admin") {
            setAllUsersInfo(result.results);
            setPaginationLinks(result.paginationLinksAccess);
            showPageButton(result.paginationLinksAccess); 

         } else {
            setUserInfo(result);
            setshowPaginationButtons(false);
         };
      };
      checkLoginAndGetData();
   }, []);


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
         <AllUsersData
            allUsersInfo = {allUsersInfo}
            userInfo = {userInfo}
            userLoggedIn = {userLoggedIn}
         />
         
         {showPaginationButtons && 
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


export default AllUsersView;