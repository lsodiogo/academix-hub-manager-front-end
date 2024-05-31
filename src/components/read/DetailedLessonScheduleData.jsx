import { Link } from "wouter";


function DetailedLessonScheduleData({ detailedLessonScheduleInfo, hideWhenDataNull }) {

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <div className="page-detailed-title">LESSONS SCHEDULES</div>
         
         <div className="page-detailed-info">
            <h3>{FormatDate(detailedLessonScheduleInfo.date)}</h3>

            <div>BEGIN: {detailedLessonScheduleInfo.begin_time}</div>

            <div>END: {detailedLessonScheduleInfo.end_time}</div>

            {!hideWhenDataNull &&
               <div>DESCRIPTION: {detailedLessonScheduleInfo.description}</div>
            }

            <div>COURSE:&nbsp;
               <Link href={"/courses/" + detailedLessonScheduleInfo.course_id}>
                  {detailedLessonScheduleInfo.course_name}
               </Link>
            </div>
            
            <div>STATUS: {detailedLessonScheduleInfo.status_name}</div>
         </div>
      </>
   );
};


export default DetailedLessonScheduleData;