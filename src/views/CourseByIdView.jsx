import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import CourseDetailedData from "../components/CourseDetailedData";


function CourseByIdView({ pathParams }) {
 
   const [detailedCourseInfo, setDetailedCourseInfo] = useState({});
   const [hideWhenDataNull, setHideWhenDataNull] = useState(false);

   useEffect(function() {
      async function getAllData() {

         const result = await apiService.fetchData(`courses/${pathParams}`, "GET");
         console.log(result);
         
         if (result.error === "WARNING") {
            window.location.href = "/pagenotfound";
            return;
         };
         
         setDetailedCourseInfo(result);

         if (!result.description) {
            setHideWhenDataNull(true);
         };
      };
      getAllData();
   }, []);


   return (
      <>
         <CourseDetailedData
            detailedCourseInfo = {detailedCourseInfo}
            hideWhenDataNull = {hideWhenDataNull}
         />
      </>
   );
};


export default CourseByIdView;