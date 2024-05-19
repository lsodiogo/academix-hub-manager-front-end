import { Link } from "wouter";


function CourseDetailedData({ detailedCourseInfo, hideWhenDataNull }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

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

            <p>Teacher:
               <Link href={"/teachers/" + detailedCourseInfo.teacher_id}>
                  {detailedCourseInfo.teacher_name}
               </Link>
            </p>
            
            <p>Status: 
               <Link href={"/status/" + detailedCourseInfo.status_id}>
                  {detailedCourseInfo.status_name}
               </Link>
            </p>

            <p>Created at: {formatDate(detailedCourseInfo.created_at)}</p>
         </div>
      </>
   );
};


export default CourseDetailedData;