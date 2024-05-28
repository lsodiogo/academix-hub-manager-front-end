import { Link } from "wouter";


function CourseDetailedData({ detailedCourseInfo, hideWhenDataNull, cookieInfo }) {
   
   function userCategoryCheck(item) {
      if (cookieInfo.userCategory === "admin" || (cookieInfo.userCategory === "teacher" && cookieInfo.userEmail === item.teacher_email)) {
         return true;
      } else {
         return false;
      };
   };
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>COURSES</h2>
         
         <div>
            <h3>{detailedCourseInfo.name}</h3>

            <p>Edition: {detailedCourseInfo.edition_number}</p>

            <p>Duration: {detailedCourseInfo.hours_duration}h</p>

            <p>Begin: {formatDate(detailedCourseInfo.begin_date)}</p>

            <p>End: {formatDate(detailedCourseInfo.end_date)}</p>

            {!hideWhenDataNull &&
               <p>Description: {detailedCourseInfo.description}</p>
            }

            <p>Teacher:&nbsp;
               {userCategoryCheck(detailedCourseInfo) ?
                  (<Link href={"/teachers/" + detailedCourseInfo.teacher_id}>
                     {detailedCourseInfo.teacher_name}
                  </Link>)
                  
                  :
                  
                  (<span>
                     {detailedCourseInfo.teacher_name}
                  </span>)
               }
            </p>
            
            <p>Status: {detailedCourseInfo.status_name}</p>
         </div>
      </>
   );
};


export default CourseDetailedData;