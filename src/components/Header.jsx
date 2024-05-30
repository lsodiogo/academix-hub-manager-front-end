import { Link } from "wouter";


function Header() {


   return (
      <>
         <header>
            <Link href="/">
               <img src="./images/logo.svg" alt="logo"/>
            </Link>
            
            
            <Link href="/" className="link">
               <h1>ACADEMIX HUB MANAGER</h1>
            </Link>
         </header>
      </>
   );
};


export default Header;