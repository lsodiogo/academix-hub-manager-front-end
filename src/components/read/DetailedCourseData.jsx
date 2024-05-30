import { Link } from "wouter";


function CourseDetailedData({ detailedCourseInfo, hideWhenDataNull, cookieInfo }) {
   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || (cookieInfo.userCategory === "teacher" && cookieInfo.userEmail === item.teacher_email)) {
         return true;
      } else {
         return false;
      };
   };


   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>COURSES</h2>
         
         <div>
            <h3>{detailedCourseInfo.name}</h3>

            <div>EDITION: {detailedCourseInfo.edition_number}</div>

            <div>DURATION: {detailedCourseInfo.hours_duration}h</div>

            <div>BEGIN: {FormatDate(detailedCourseInfo.begin_date)}</div>

            <div>END: {FormatDate(detailedCourseInfo.end_date)}</div>

            {!hideWhenDataNull &&
               <div>Description: {detailedCourseInfo.description}</div>
            }

            <div>TEACHER:&nbsp;
               {userCategoryCheck(detailedCourseInfo) ? (
                  <Link href={"/teachers/" + detailedCourseInfo.teacher_id}>
                     {detailedCourseInfo.teacher_name}
                  </Link>
                  
               ) : (
                  
                  <span>
                     {detailedCourseInfo.teacher_name}
                  </span>
               )}
            </div>
            
            <div>Status: {detailedCourseInfo.status_name}</div>
         </div>
      </>
   );
};


export default CourseDetailedData;