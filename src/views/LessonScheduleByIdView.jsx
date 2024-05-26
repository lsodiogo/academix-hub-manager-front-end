import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import LessonScheduleDetailedData from "../components/LessonScheduleDetailedData";


function LessonScheduleByIdView({ pathParams }) {
 
   const [detailedLessonScheduleInfo, setDetailedLessonScheduleInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`lessons_schedule/${pathParams}`, "GET");
         console.log(result);
         
         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };

         setDetailedLessonScheduleInfo(result);

         if (!result.description) {
            setHideWhenDataNull(true);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <LessonScheduleDetailedData
            detailedLessonScheduleInfo = {detailedLessonScheduleInfo}
            hideWhenDataNull = {hideWhenDataNull}
         />
      </>
   );
};


export default LessonScheduleByIdView;