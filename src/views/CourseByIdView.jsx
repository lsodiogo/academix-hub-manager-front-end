import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../services/apiService";


function CourseByIdView({pathParams}) {
 
   const [hideDataNullField, setHideDataNullField] = useState(false);
   const [detailedCourseInfo, setDetailedCourseInfo] = useState({});

   useEffect(function() {
      (async function getAllData() {

         const result = await apiService.fetchData(`courses/${pathParams}`, "GET");

         console.log(result);

         setDetailedCourseInfo(result);

         if (!result.description) {
            setHideDataNullField(true);
         };

      })();
   }, []);

   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };


   return (
      <div>
         <h1>{detailedCourseInfo.name}</h1>
         <p>Edition: {detailedCourseInfo.edition_number}</p>
         <p>Duration: {detailedCourseInfo.hours_duration}h</p>
         <p>Begin: {formatDate(detailedCourseInfo.begin_date)}</p>
         <p>End: {formatDate(detailedCourseInfo.end_date)}</p>
         {!hideDataNullField && <p>Description: {detailedCourseInfo.description}</p>}
         <p>Teacher: <Link href={"/teachers/" + detailedCourseInfo.teacher_id}>{detailedCourseInfo.teacher_name}</Link></p>
         <p>Status: <Link href={"/status/" + detailedCourseInfo.status_id}>{detailedCourseInfo.status_name}</Link></p>
         <p>Created at: {formatDate(detailedCourseInfo.created_at)}</p>
      </div>
   );
};


export default CourseByIdView;