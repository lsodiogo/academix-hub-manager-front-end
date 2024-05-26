import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import TeacherDetailedData from "../components/TeacherDetailedData";


function TeacherByIdView({ pathParams }) {
 
   const [detailedTeacherInfo, setDetailedTeacherInfo] = useState({});


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`teachers/${pathParams}`, "GET");
         console.log(result);
         
         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };
         
         setDetailedTeacherInfo(result);
      };
      getAllData();
   }, []);


   return (
      <>
         <TeacherDetailedData
            detailedTeacherInfo = {detailedTeacherInfo}
         />
      </>
   );
};


export default TeacherByIdView;