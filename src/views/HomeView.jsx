import { Link } from "wouter";


function HomeView() {
   
   return (
      <>
         <Link href="/login">
            <span>LOGIN</span>
         </Link>

         <br/>
         
         <Link href="/register">
            <span>SIGN IN</span>
         </Link> 
      </>
   );

};


export default HomeView;