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
                           {Object.keys(JSON.parse(item.action_description)).map(key => (
                              <div key={key}>
                                 <span>
                                    {key} -&nbsp;
                                 </span>

                                 {typeof JSON.parse(item.action_description)[key] === "object" && JSON.parse(item.action_description)[key] !== null ? (
                                    Object.keys(JSON.parse(item.action_description)[key]).map(innerKey => (
                                       <span key={innerKey} className="wrap">
                                          {innerKey}:&nbsp;
                                          {JSON.parse(item.action_description)[key][innerKey]}&nbsp;
                                       </span>
                                    ))

                                 ) : (
                                 
                                    <span className="wrap">
                                       {JSON.parse(item.action_description)[key]}
                                    </span>
                                 )}
                              </div>
                           ))}
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