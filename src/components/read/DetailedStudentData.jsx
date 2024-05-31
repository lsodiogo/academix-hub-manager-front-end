import { Link } from "wouter";


function StudentDetailedData({ detailedStudentInfo, hideWhenDataNull }) {

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <div className="page-detailed-title">STUDENTS</div>
         
         <div className="page-detailed-info">
            <h3>{detailedStudentInfo.name} {detailedStudentInfo.surname}</h3>
            
            <div>BIRTHDATE: {FormatDate(detailedStudentInfo.birthdate)}</div>

            <div>EMAIL: {detailedStudentInfo.email}</div>

            <div>PHONE: {detailedStudentInfo.telef}</div>

            <div>ADDRESS: {detailedStudentInfo.address}</div>

            <div>ENROLLED: {FormatDate(detailedStudentInfo.enrolled_at)}</div>

            <div>COURSE:&nbsp;
               <Link href={"/courses/" + detailedStudentInfo.course_id}>
                  {detailedStudentInfo.course_name}
               </Link>
            </div>

            {!hideWhenDataNull &&
               <div>GRADE: {detailedStudentInfo.grade}</div>
            }

            {!hideWhenDataNull &&
               <div>GRADUATED: {detailedStudentInfo.graduated_at}</div>
            }

            <div>STATUS: {detailedStudentInfo.status_name}</div>
         </div>
      </>
   );
};


export default StudentDetailedData;