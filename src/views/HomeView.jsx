import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import LoginForm from "../components/LoginForm";
import NavigationTables from "../components/NavigationTables";


function HomeView() {

   const [userLoggedIn, setUserLoggedIn] = useState({});
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [loginResult, setLoginResult] = useState({}); 
   const [showLoginForm, setShowLoginForm] = useState(false);


   useEffect(function() {
      async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");
         console.log(result);

         if (result.error === "WARNING") {
            setShowLoginForm(true);
         };

         setUserLoggedIn(result);
      };
      checkLogin();
   }, []);
   
   
   async function loginPost(event) {

      event.preventDefault();

      const body = {
         email,
         password,
         rememberMe
      };

      const result = await apiService.fetchData("login", "POST", body);
      console.log(result);

      setLoginResult(result);

      if (result.error === "SUCCESS") {
         setShowLoginForm(false);

         // To get check login information again to be sent to Navigation Tables component
         const result = await apiService.fetchData("login", "GET");
         setUserLoggedIn(result);
      };
   };


   async function logoutPost(event) {
    
      event.preventDefault();

      const result = await apiService.fetchData("login/logout", "GET");
      console.log(result);
      
      if (result.error === "SUCCESS") {
         setShowLoginForm(true);
         
         // To reset state variables
         setEmail("");
         setPassword("");
         setRememberMe(false);
      };
   };


   return (
      <>
         {showLoginForm ? 
            <div>
               <LoginForm
                  email = {email}
                  setEmail = {setEmail}
                  password = {password}
                  setPassword = {setPassword}
                  rememberMe = {rememberMe}
                  setRememberMe = {setRememberMe}
                  loginPost = {loginPost}
               />
               
               {loginResult.error === "WARNING" &&
                  <div>
                     <p>{loginResult.error} {loginResult.message}</p>
                  </div>
               }
            </div>

            :

            <div>
               <NavigationTables
                  userLoggedIn = {userLoggedIn}
               />

               <div>
                  <button onClick={logoutPost}>LOGOUT</button>
               </div>
            </div>
         }
      </>
   );
};


export default HomeView;