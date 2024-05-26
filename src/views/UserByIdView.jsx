import { useEffect, useState } from "react";

import apiService from "../services/apiService";
import UserDetailedData from "../components/UserDetailedData";


function UserByIdView({ pathParams }) {
 
   const [detailedUserInfo, setDetailedUserInfo] = useState({});

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`users/${pathParams}`, "GET");
         console.log(result);
         
         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };
         
         setDetailedUserInfo(result);
      };
      getAllData();
   }, []);


   return (
      <>
         <UserDetailedData
            detailedUserInfo = {detailedUserInfo}
         />
      </>
   );
};


export default UserByIdView;