import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import LessonScheduleDetailedData from "../components/LessonScheduleDetailedData";


function LessonScheduleByIdView({ pathParams }) {
 
   const [detailedLessonScheduleInfo, setDetailedLessonScheduleInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);
   const [checkErrorOk, setCheckErrorOk] = useState(true);

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`lessons_schedule/${pathParams}`, "GET");
         console.log(result);
         
         setDetailedLessonScheduleInfo(result);

         if (!result.description) {
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
         <LessonScheduleDetailedData
            detailedLessonScheduleInfo = {detailedLessonScheduleInfo}
            hideWhenDataNull = {hideWhenDataNull}
            checkErrorOk = {checkErrorOk}
         />
      </>
   );
};


export default LessonScheduleByIdView;