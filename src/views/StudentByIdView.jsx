import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import StudentDetailedData from "../components/StudentDetailedData";


function StudentByIdView({ pathParams }) {
 
   const [detailedStudentInfo, setDetailedStudentInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);
   const [checkErrorOk, setCheckErrorOk] = useState(true);


   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`students/${pathParams}`, "GET");
         console.log(result);
         
         setDetailedStudentInfo(result);

         if (!result.grade || !result.graduated_at) {
            setHideWhenDataNull(true);
         };

         if (result.error === "WARNING") {
            setCheckErrorOk(false);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <StudentDetailedData
            detailedStudentInfo = {detailedStudentInfo}
            hideWhenDataNull = {hideWhenDataNull}
            checkErrorOk = {checkErrorOk}
         />
      </>
   );
};


export default StudentByIdView;