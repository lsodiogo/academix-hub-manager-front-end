import { Link } from "wouter";


function StudentDetailedData({ detailedStudentInfo, hideWhenDataNull, checkErrorOk }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>STUDENTS</h2>
         
         {checkErrorOk ?
            <div>
               <h3>{detailedStudentInfo.name} {detailedStudentInfo.surname}</h3>

               <p>Birthdate: {formatDate(detailedStudentInfo.birthdate)}</p>

               <p>Email: {detailedStudentInfo.email}</p>

               <p>Phone: {detailedStudentInfo.telef}</p>

               <p>Address: {detailedStudentInfo.address}</p>

               <p>Enrolled at: {formatDate(detailedStudentInfo.enrolled_at)}</p>

               <p>Course:&nbsp;
                  <Link href={"/course/" + detailedStudentInfo.course_id}>
                     {detailedStudentInfo.course_name}
                  </Link>
               </p>

               {!hideWhenDataNull &&
                  <p>Grade: {detailedStudentInfo.grade}</p>
               }

               {!hideWhenDataNull &&
                  <p>Graduated at: {detailedStudentInfo.graduated_at}</p>
               }

               <p>Status: {detailedStudentInfo.status_name}</p>
            </div>

         :
         
            <div>
               <p>{detailedStudentInfo.error} {detailedStudentInfo.message}</p>
            </div>
         }
      </>
   );
};


export default StudentDetailedData;