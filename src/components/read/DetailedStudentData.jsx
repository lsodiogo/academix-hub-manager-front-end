import { Link } from "wouter";


function StudentDetailedData({ detailedStudentInfo, hideWhenDataNull }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>STUDENTS</h2>
         
         <div>
            <h3>{detailedStudentInfo.name} {detailedStudentInfo.surname}</h3>

            <div>Birthdate: {formatDate(detailedStudentInfo.birthdate)}</div>

            <div>Email: {detailedStudentInfo.email}</div>

            <div>Phone: {detailedStudentInfo.telef}</div>

            <div>Address: {detailedStudentInfo.address}</div>

            <div>Enrolled at: {formatDate(detailedStudentInfo.enrolled_at)}</div>

            <div>Course:&nbsp;
               <Link href={"/courses/" + detailedStudentInfo.course_id}>
                  {detailedStudentInfo.course_name}
               </Link>
            </div>

            {!hideWhenDataNull &&
               <div>Grade: {detailedStudentInfo.grade}</div>
            }

            {!hideWhenDataNull &&
               <div>Graduated at: {detailedStudentInfo.graduated_at}</div>
            }

            <div>Status: {detailedStudentInfo.status_name}</div>
         </div>
      </>
   );
};


export default StudentDetailedData;