import { useEffect, useState } from "react";

import apiService from "../services/apiService";
import UserDetailedData from "../components/UserDetailedData";


function UserByIdView({ pathParams }) {
 
   const [detailedUserInfo, setDetailedUserInfo] = useState({});
   const [checkErrorOk, setCheckErrorOk] = useState(true);


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`users/${pathParams}`, "GET");
         console.log(result);
         
         setDetailedUserInfo(result);

         if (result.error === "WARNING") {
            setCheckErrorOk(false);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <UserDetailedData
            detailedUserInfo = {detailedUserInfo}
            checkErrorOk = {checkErrorOk}
         />
      </>
   );
};


export default UserByIdView;