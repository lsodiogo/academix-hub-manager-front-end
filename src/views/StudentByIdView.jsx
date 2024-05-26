import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import StudentDetailedData from "../components/StudentDetailedData";


function StudentByIdView({ pathParams }) {
 
   const [detailedStudentInfo, setDetailedStudentInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`students/${pathParams}`, "GET");
         console.log(result);
         
         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };

         setDetailedStudentInfo(result);

         if (!result.grade || !result.graduated_at) {
            setHideWhenDataNull(true);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <StudentDetailedData
            detailedStudentInfo = {detailedStudentInfo}
            hideWhenDataNull = {hideWhenDataNull}
         />
      </>
   );
};


export default StudentByIdView;