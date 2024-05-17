import { Link } from "wouter";


function Breadcrumbs() {
 
   return (
      <div>
         <Link href="/">Home</Link>

         <span> &gt; </span>

         <Link href="/allstudents">Students</Link>
         
         <span> &gt; </span>
      </div>
   );
};


export default Breadcrumbs;