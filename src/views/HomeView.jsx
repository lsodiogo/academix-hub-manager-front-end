import { useEffect, useState } from "react";

import apiService from "../services/apiService";

import LoginForm from "../components/LoginForm";


function HomeView() {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [loginResult, setLoginResult] = useState({}); 
   const [showLoginForm, setShowLoginForm] = useState(false);

   const [schoolInfo, setSchoolInfo] = useState({});

   useEffect(function() {
      async function getAllSchoolData() {

         const result = await apiService.fetchData("school", "GET");

         setSchoolInfo(result.results);
      };
      getAllSchoolData();
   }, []);

   useEffect(function() {
      async function checkLogin() {

         const result = await apiService.fetchData("login", "GET");

         if (result.type === "WARNING") {
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

      setLoginResult(result);

      if (result.type === "SUCCESS") {
         setShowLoginForm(false);
         window.location.reload();
      };
   };


   return (
      <>
         {showLoginForm ? (
            <div className="container">
               <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  loginPost={loginPost}
               />
               
               {loginResult.type === "WARNING" &&
                  <div className="warning-message">
                     <div>{loginResult.type}: {loginResult.message}</div>
                  </div>
               }
            </div>

         ) : (

            schoolInfo && (
               <div className="welcome-container">
                  WELCOME TO ACADEMIX HUB MANAGER OF {schoolInfo.name}
               </div>
            )
         )}
      </>
   );
};


export default HomeView;