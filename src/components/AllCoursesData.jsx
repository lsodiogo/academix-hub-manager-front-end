import { Link } from "wouter";


function AllCoursesData({ allCoursesInfo }) {

   
   return (
      <>
         <h2>COURSES</h2>

         <div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                  </tr>
               </thead>
               <tbody>
                  {allCoursesInfo.map(item =>
                     <tr key={item.id}>
                        <td>
                           <Link href={"/course/" + item.id}>{item.name}</Link>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};


export default AllCoursesData;