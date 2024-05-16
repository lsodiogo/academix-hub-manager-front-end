import { Link } from "wouter";
import { useState, useEffect } from "react";

import apiService from "../services/apiService";


function LoginView() {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showLogoutButton, setLogoutButton] = useState(false);
   const [showLoginForm, setShowLoginForm] = useState(false);

   const [loginResult, setLoginResult] = useState({}); 


   useEffect(function() {
      (async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         console.log(result);

         if (result.error != "WARNING") {
            setLogoutButton(true);
         } else {
            setShowLoginForm(true);
         };
      })();
   }, []);


   async function login(event) {

      event.preventDefault();

      const body = {
      email,
      password
      };

      const result = await apiService.fetchData("login", "POST", body);

      console.log(result);
      setLoginResult(result);

      if (result.error === "SUCCESS") {
         setLogoutButton(true);
         setShowLoginForm(false);
      };
   };


   async function logout(event) {
    
      event.preventDefault();

      const result = await apiService.fetchData("login/logout", "GET");

      console.log(result);

      if (result.error === "SUCCESS") {
         setLogoutButton(false);
         setShowLoginForm(true);
      };
   };

  
   return (
      <>
         <div>
            <h1>ACADEMIX HUB MANAGER</h1>
         </div>

         {showLogoutButton &&
            <div>
               <button onClick={logout}>LOGOUT</button>
            </div>
         }

         {showLoginForm ? 
            <div>
               <form onSubmit={login}>
                  <div>
                     <input
                        placeholder="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>
                  <div>
                     <input
                        placeholder="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                     />
                  </div>
                  <div>
                     <button typeof="SUBMIT">LOGIN</button>
                  </div>
               </form>

               <div>
                  <p>{loginResult.error} {loginResult.message}</p>
               </div>
            </div>

            :

            <div>
               <Link href="/x">
                  <span>SCHOOL</span>
               </Link>

               <br/>

               <Link href="/x">
                  <span>COURSES</span>
               </Link>

               <br/>

               <Link href="/x">
                  <span>LESSONS SCHEDULES</span>
               </Link>

               <br/>

               <Link href="/x">
                  <span>TEACHERS</span>
               </Link>

               <br/>

               <Link href="/students">
                  <span>STUDENTS</span>
               </Link>

               <br/>

               <Link href="/x">
                  <span>USERS</span>
               </Link>

               <br/>

               <Link href="/x">
                  <span>BACKLOG</span>
               </Link>
            </div>
         }
      </>
   );
};


export default LoginView;