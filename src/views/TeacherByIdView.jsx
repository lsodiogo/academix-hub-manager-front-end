import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import TeacherDetailedData from "../components/TeacherDetailedData";


function TeacherByIdView({ pathParams }) {
 
   const [detailedTeacherInfo, setDetailedTeacherInfo] = useState({});
   const [checkErrorOk, setCheckErrorOk] = useState(true);


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`teachers/${pathParams}`, "GET");
         console.log(result);
         
         setDetailedTeacherInfo(result);

         if (result.error === "WARNING") {
            setCheckErrorOk(false);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <TeacherDetailedData
            detailedTeacherInfo = {detailedTeacherInfo}
            checkErrorOk = {checkErrorOk}
         />
      </>
   );
};


export default TeacherByIdView;