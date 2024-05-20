function AllBacklogData({ allBacklogInfo }) {

   function formatDate(item) {
      const dateFormated = new Date(item).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      return dateFormated;
   };

   
   return (
      <>
         <h2>BACKLOG</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Action</th>
                     <th>Table</th>
                     <th>ID Table Row</th>
                     <th>Action Description</th>
                     <th>User</th>
                     <th>Created at</th>
                  </tr>
               </thead>
               
               <tbody>
                  {allBacklogInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           {item.id}
                        </td>
                        <td>
                           {item.action}
                        </td>
                        <td>
                           {item.table_name}
                        </td>
                        <td>
                           {item.row_id}
                        </td>
                        <td>
                           {item.action_description}
                        </td>
                        <td>
                           {item.user_email}
                        </td>
                        <td>
                           {formatDate(item.created_at)}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllBacklogData;