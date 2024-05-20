import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import CourseDetailedData from "../components/CourseDetailedData";


function CourseByIdView({ pathParams }) {
 
   const [detailedCourseInfo, setDetailedCourseInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);
   const [checkErrorOk, setCheckErrorOk] = useState(true);

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`courses/${pathParams}`, "GET");
         console.log(result);
         
         setDetailedCourseInfo(result);

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
         <CourseDetailedData
            detailedCourseInfo = {detailedCourseInfo}
            hideWhenDataNull = {hideWhenDataNull}
            checkErrorOk = {checkErrorOk}
         />
      </>
   );
};


export default CourseByIdView;