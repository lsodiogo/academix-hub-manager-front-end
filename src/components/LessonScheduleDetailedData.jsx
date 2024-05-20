import { Link } from "wouter";


function LessonScheduleDetailedData({ detailedLessonScheduleInfo, hideWhenDataNull, checkErrorOk }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>LESSONS SCHEDULES</h2>
         
         {checkErrorOk ?
            <div>
               <h3>{formatDate(detailedLessonScheduleInfo.date)}</h3>

               <p>BEGIN: {detailedLessonScheduleInfo.begin_time}</p>

               <p>END: {detailedLessonScheduleInfo.end_time}</p>

               {!hideWhenDataNull &&
                  <p>DESCRIPTION: {detailedLessonScheduleInfo.description}</p>
               }

               <p>COURSE:&nbsp;
                  <Link href={"/lessons_schedule/" + detailedLessonScheduleInfo.course_id}>
                     {detailedLessonScheduleInfo.course_name}
                  </Link>
               </p>
               
               <p>STATUS: {detailedLessonScheduleInfo.status_name}</p>
            </div>
         
         :
         
            <div>
               <p>{detailedLessonScheduleInfo.error} {detailedLessonScheduleInfo.message}</p>
            </div>
         }
      </>
   );
};


export default LessonScheduleDetailedData;