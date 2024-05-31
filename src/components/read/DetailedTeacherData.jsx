function TeacherDetailedData({ detailedTeacherInfo }) {

   function FormatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <div className="page-detailed-title">TEACHERS</div>
         
         <div  className="page-detailed-info">
            <h3>{detailedTeacherInfo.name} {detailedTeacherInfo.surname}</h3>

            <div>BIRTHDATE: {FormatDate(detailedTeacherInfo.birthdate)}</div>

            <div>EMAIL: {detailedTeacherInfo.email}</div>

            <div>PHONE: {detailedTeacherInfo.telef}</div>

            <div>ADDRESS: {detailedTeacherInfo.address}</div>

            <div>STARTED: {FormatDate(detailedTeacherInfo.started_at)}</div>

            <div>STATUS: {detailedTeacherInfo.status_name}</div>
         </div>
      </>
   );
};


export default TeacherDetailedData;