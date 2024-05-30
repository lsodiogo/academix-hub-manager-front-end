function AllBacklogData({ allBacklogInfo }) {

   
   return (
      <>
         <div className="table-container">
            <table>
               <caption>BACKLOG</caption>

               <thead>
                  <tr>
                     <th>ID</th>
                     <th>ACTION</th>
                     <th>TABLE</th>
                     <th>ID TABLE ROW</th>
                     <th>ACTION DESCRIPTION</th>
                     <th>USER</th>
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
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllBacklogData;