import { Link } from "wouter";
import { useEffect, useState } from "react";

import apiService from "../services/apiService";


function StudentByIdView({pathParams}) {
 
   const [hideDataNullField, setHideDataNullField] = useState(false);
   const [detailedStudentInfo, setDetailedStudentInfo] = useState({});

   useEffect(function() {
      (async function getAllData() {

         const result = await apiService.fetchData(`students/${pathParams}`, "GET");

         console.log(result);

         setDetailedStudentInfo(result);

         if (!result.grade || !result.graduated_at) {
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
         <h1>{detailedStudentInfo.name} {detailedStudentInfo.surname}</h1>
         <p>Birthdate: {formatDate(detailedStudentInfo.birthdate)}</p>
         <p>E-mail: {detailedStudentInfo.email}</p>
         <p>Phone: {detailedStudentInfo.telef}</p>
         <p>Address: {detailedStudentInfo.address}</p>
         <p>Enrolled at: {formatDate(detailedStudentInfo.enrolled_at)}</p>
         <p>Course: <Link href={"/courses/" + detailedStudentInfo.course_id}>{detailedStudentInfo.course_name}</Link></p>
         {!hideDataNullField && <p>Grade: {detailedStudentInfo.grade}</p>}
         {!hideDataNullField && <p>Graduated at: {detailedStudentInfo.graduated_at}</p>}
         <p>Status: <Link href={"/status/" + detailedStudentInfo.status_id}>{detailedStudentInfo.status_name}</Link></p>
         <p>Created at: {formatDate(detailedStudentInfo.created_at)}</p>
      </div>
   );
};


export default StudentByIdView;