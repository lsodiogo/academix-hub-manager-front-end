import { Link } from "wouter";


function AllLessonsScheduleData({ allLessonsScheduleInfo }) {

   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>LESSONS SCHEDULES</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>DATE</th>
                     <th>BEGIN</th>
                     <th>END</th>
                     <th>STATUS</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allLessonsScheduleInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           <Link href={"/lesson_schedule/" + item.id}>{formatDate(item.date)}</Link>
                        </td>
                        <td>
                           {item.begin_time}
                        </td>
                        <td>
                           {item.end_time}
                        </td>
                        <td>
                           {item.status_name}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllLessonsScheduleData;