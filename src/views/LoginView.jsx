import { useState, useEffect } from "react";

import apiService from "../services/apiService";


function LoginView() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [logoutButton, setLogoutButton] = useState(false);
   const [showLoginForm, setShowLoginForm] = useState(false);
   const [user, setUser] = useState({});


   useEffect(function() {
      (async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         console.log(result);

         if (result.error === "SUCCESS") {
            setLogoutButton(true);
         } else {
            setShowLoginForm(true);
         };
         
         setUser(result);
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
      {showLoginForm ? 
         <div>
            <form onSubmit={login}>
               <div>
                  <input
                     placeholder="email"
                     name="email"
                     // type="email"
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
               {}
            </div>
         </div>
         :
         <div>{user.message}</div>
      }

      {logoutButton &&
         <div>
            <button onClick={logout}>LOGOUT</button>
         </div>
      }
      </>
   );
};


export default LoginView;