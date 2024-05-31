import { useState } from "react";

import apiService from "../../services/apiService";


function UpdateUserForm({ selectedUser, showUpdateDialog, setShowUpdateDialog, cookieInfo }) {
   
   if (!selectedUser) {
      return;
   };


   const [formData, setFormData] = useState({
      password: ""
   });
   
   const [passwordRepeated, setPasswordRepeated] =  useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [fieldsRequired, setFieldsRequired] = useState(false);
   const [alertMessage, setAlertMessage] = useState(null);
   const [showAlertMessage, setShowAlertMessage] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);


   function handleChange(event) {
      event.preventDefault();

      const { name, value } = event.target;

      setFieldsRequired(false);
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
   };


   function handleTogglePassword() {
      setShowPassword(!showPassword);
   };


   function getPasswordStrength(password) {
      let strength = {
         length: false,
         lowercase: false,
         uppercase: false,
         number: false,
         specialCharacter: false
      };
   
      if (password.length >= 8) {
         strength.length = true;
      };
   
      if (/[a-z]/.test(password)) {
         strength.lowercase = true;
      };
   
      if (/[A-Z]/.test(password)) {
         strength.uppercase = true;
      };
   
      if (/[0-9]/.test(password)) {
         strength.number = true;
      };
   
      if (/[!@#$%^&*]/.test(password)) {
         strength.specialCharacter = true;
      };
   
      return strength;
   };


   async function handleSubmit(event) {
      event.preventDefault();

      if (!formData.password) {
         setFieldsRequired(true);
         return;
      };


      const strength = getPasswordStrength(formData.password);

      if (!strength.length || !strength.lowercase || !strength.uppercase || !strength.number || !strength.specialCharacter) {
         setFieldsRequired(false);

         setAlertMessage("PASSWORD MUST BE AT LEAST 8 CHARACTERS, CONTAIN AT LEAST ONE LOWERCASE LETTER, ONE UPPERCASE LETTER, ONE NUMBER, AND ONE SPECIAL CHARACTER.");
         setShowAlertMessage(true);
         return;
      } else {
         setShowAlertMessage(false);
      };


      if (!passwordRepeated) {
         setFieldsRequired(true);
         return;
      };


      if (formData.password !== passwordRepeated) {
         setFieldsRequired(false);
         
         setAlertMessage("PASSWORD DO NOT MATCH");
         setShowAlertMessage(true);
         return;
      } else {
         setFieldsRequired(false);
         setAlertMessage(false);
      };

      
      const result = await apiService.fetchData(`users/${selectedUser.id}`, "PUT", formData);
      console.log(result);

      setFieldsRequired(false);

      setFormData({
         password: ""
      });

      setShowUpdateDialog(false);
      setFieldsRequired(false);
      setShowAlertMessage(false);

      setDialogMessageResult("Password updated with success! Please, login again.");
      setShowDialogMessageResult(true);
   };


   async function handleMessageResultButtonClick() {
      setShowDialogMessageResult(false);
      
      if (selectedUser.email === cookieInfo.userEmail) {
         await apiService.fetchData("login/logout", "GET");
         window.location.href = "/";

      } else {
         window.location.reload();
      };
   };


   async function handleCancelClick() {
      window.location.reload();
   };

 
   return (
        <>
            <dialog open={showUpdateDialog}>
               <div className="dialogScroll">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <h1>UPDATE PASSWORD</h1>

                        <label>
                           NEW PASSWORD *
                           <input
                              placeholder="new password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              minLength="8"
                              maxLength="18"
                              value={formData.password}
                              onChange={(event) => handleChange(event)}
                           />
                           <input
                              placeholder="repeat password"
                              type={showPassword ? "text" : "password"}
                              name="passwordRepeated"
                              minLength="8"
                              maxLength="18"
                              value={passwordRepeated}
                              onChange={(event) => setPasswordRepeated(event.target.value)}
                           />

                           <div className="instruction">
                              <span style={{ color: getPasswordStrength(formData.password).length ? "green" : "red" }}>
                                 - At least 8 characters
                              </span>

                              <span style={{ color: getPasswordStrength(formData.password).lowercase ? "green" : "red" }}>
                                 - At least one lowercase letter
                              </span>

                              <span style={{ color: getPasswordStrength(formData.password).uppercase ? "green" : "red" }}>
                                 - At least one uppercase letter
                              </span>
                        
                              <span style={{ color: getPasswordStrength(formData.password).number ? "green" : "red" }}>
                                 - At least one number
                              </span>

                              <span style={{ color: getPasswordStrength(formData.password).specialCharacter ? "green" : "red" }}>
                                 - At least one special character !@#$%^&*
                              </span>

                              <button type="button" onClick={handleTogglePassword}>
                                 {showPassword ? "Hide Password" : "Show Password"}
                              </button>
                           </div>
                        </label>

                        {fieldsRequired &&
                           <div className="alert-message">
                           * FIELDS REQUIRED!
                           </div>
                        }

                        {showAlertMessage &&
                           <div className="alert-message">
                              {alertMessage}
                           </div>
                        }

                        <div>
                           <button type="submit">
                              UPDATE
                           </button>
                           <button type="button" onClick={handleCancelClick}>
                              CANCEL
                           </button>
                        </div>
                     </fieldset>
                  </form>
               </div>
            </dialog>

            <dialog open={showDialogMessageResult}>
               <div>
                  <h2>{dialogMessageResult}</h2>
                  <button type="button" onClick={handleMessageResultButtonClick}>OK</button>
               </div>
            </dialog>
        </>
   );
};


export default UpdateUserForm;