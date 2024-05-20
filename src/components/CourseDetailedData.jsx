import { Link } from "wouter";


function CourseDetailedData({ detailedCourseInfo, hideWhenDataNull, checkErrorOk }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>COURSES</h2>
         
         {checkErrorOk ?
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
                  <Link href={"/teacher/" + detailedCourseInfo.teacher_id}>
                     {detailedCourseInfo.teacher_name}
                  </Link>
               </p>
               
               <p>Status: {detailedCourseInfo.status_name}</p>
            </div>
         
         :
         
            <div>
               <p>{detailedCourseInfo.error} {detailedCourseInfo.message}</p>
            </div>
         }
      </>
   );
};


export default CourseDetailedData;