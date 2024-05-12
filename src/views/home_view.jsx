import { Link } from "wouter";


function HomeView() {
   
   return (
      <>
         <Link href="/login">
            <span>LOGIN</span>
         </Link>

         <Link href="/register">
            <span>CREATE</span>
         </Link> 
      </>
   );

};

export default HomeView;