import { Link } from "wouter";


function Header() {


   return (
      <>
         <header>
            <Link href="/">
               <img src="./images/logo.svg" alt="logo"/>
            </Link>
            
            <h1>ACADEMIX HUB MANAGER</h1>
         </header>
      </>
   );
};


export default Header;