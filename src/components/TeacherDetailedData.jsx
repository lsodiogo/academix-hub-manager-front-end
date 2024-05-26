function TeacherDetailedData({ detailedTeacherInfo }) {
   
   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>TEACHERS</h2>
         
         <div>
            <h3>{detailedTeacherInfo.name} {detailedTeacherInfo.surname}</h3>

            <p>Birthdate: {formatDate(detailedTeacherInfo.birthdate)}</p>

            <p>Email: {detailedTeacherInfo.email}</p>

            <p>Phone: {detailedTeacherInfo.telef}</p>

            <p>Address: {detailedTeacherInfo.address}</p>

            <p>Started at: {formatDate(detailedTeacherInfo.started_at)}</p>

            <p>Status: {detailedTeacherInfo.status_name}</p>
         </div>
      </>
   );
};


export default TeacherDetailedData;