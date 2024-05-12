import { useState, useEffect } from "react";


function LoginView() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [logoutButton, setLogoutButton] = useState(false);
   const [showLoginForm, setShowLoginForm] = useState(false);


   useEffect(function() {
      (async function checkLogin() {

         const options = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include"
         };

         const response = await fetch("http://localhost:3000/login", options);
         const result = await response.json();

         console.log(result);

         if (result.error === "SUCCESS") {
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

      const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include"
      };
      
      const response = await fetch("http://localhost:3000/login", options);
      const result = await response.json();

      console.log(result);

      if (result.error === "SUCCESS") {
         setLogoutButton(true);
         setShowLoginForm(false);
      };
   };


   async function logout(event) {
    
      event.preventDefault();

      const options = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include"
      };

      const response = await fetch("http://localhost:3000/login/logout", options);
      const result = await response.json();

      console.log(result);

      if (result.error === "SUCCESS") {
         setLogoutButton(false);
         setShowLoginForm(true);
      };
   };

  
   return (
      <>
      {showLoginForm && 
         <form onSubmit={login}>
            <div>
               <input
                  name="email"
                  // type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div>
               <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div>
               <button typeof="SUBMIT">LOGIN</button>
            </div>
         </form>
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