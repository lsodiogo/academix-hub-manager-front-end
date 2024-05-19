import { useState, useEffect } from "react";

import apiService from "../services/apiService";

import LoginForm from "../components/LoginForm";
import NavigationTables from "../components/NavigationTables";


function HomeView() {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [login, setLogin] = useState({}); 
   const [showLoginForm, setShowLoginForm] = useState(false);

   useEffect(function() {
      async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         console.log(result);

         if (result.error === "WARNING") {
            setShowLoginForm(true);
         };
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

      setLogin(result);

      if (result.error === "SUCCESS") {
         setShowLoginForm(false);
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
               
               {login.error === "WARNING" && <div>
                  <p>{login.error} {login.message}</p>
               </div>}
            </div>

            :

            <div>
               <NavigationTables />

               <div>
                  <button onClick={logoutPost}>LOGOUT</button>
               </div>
            </div>
         }
      </>
   );
};


export default HomeView;