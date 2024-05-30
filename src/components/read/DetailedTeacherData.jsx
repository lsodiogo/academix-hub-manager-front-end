function TeacherDetailedData({ detailedTeacherInfo }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>TEACHERS</h2>
         
         <div>
            <h3>{detailedTeacherInfo.name} {detailedTeacherInfo.surname}</h3>

            <div>Birthdate: {formatDate(detailedTeacherInfo.birthdate)}</div>

            <div>Email: {detailedTeacherInfo.email}</div>

            <div>Phone: {detailedTeacherInfo.telef}</div>

            <div>Address: {detailedTeacherInfo.address}</div>

            <div>Started at: {formatDate(detailedTeacherInfo.started_at)}</div>

            <div>Status: {detailedTeacherInfo.status_name}</div>
         </div>
      </>
   );
};


export default TeacherDetailedData;