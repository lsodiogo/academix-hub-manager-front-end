import { Link } from "wouter";


function Footer() {

   return (
      <>
         <footer className="footer">
            <div className="socialMedia">
               <Link href="/">
                  <img src="../images/home.svg" alt="home-icon" />
                  <span></span>
               </Link>

               <a href="https://www.instagram.com/diogooslima/" target="_blank">
                  <img src="../images/instagram.svg" alt="instagram-icon"/>
                  <span></span>
               </a>

               <a href="https://www.linkedin.com/in/diogooslima/" target="_blank">
                  <img src="../images/linkedin.svg" alt="linkedin-icon"/>
                  <span></span>
               </a>

               <a href="https://www.github.com/lsodiogo/" target="_blank">
                  <img src="../images/github.svg" alt="github-icon"/>
                  <span></span>
               </a>
            </div>

            <div className="copyright">
               Diogo Lima @ 2024
            </div>
         </footer>
      </>
   )
   
};

export default Footer;