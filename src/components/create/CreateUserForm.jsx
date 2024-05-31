import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function CreateUserForm({ showCreateDialog, setShowCreateDialog }) {

   const [formData, setFormData] = useState({
      email: "",
      password: "",
      category: ""
   });
   const [result, setResult] = useState({});
   
   const [teachers, setTeachers] = useState([]);
   const [students, setStudents] = useState([]);

   const [passwordRepeated, setPasswordRepeated] =  useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [fieldsRequired, setFieldsRequired] = useState(false);
   const [alertMessage, setAlertMessage] = useState(null);
   const [showAlertMessage, setShowAlertMessage] = useState(false);
   const [dialogMessageResult, setDialogMessageResult] = useState(null);
   const [showDialogMessageResult, setShowDialogMessageResult] = useState(false);


   useEffect(function() {
      async function getDataToCheckTeacherStudentEmail() {

         const getTotalTeachers = await apiService.fetchData("teachers", "GET");
         const resultTeachers = await apiService.fetchData(`teachers/?limit=${getTotalTeachers.totalItems}&offset=0`, "GET");

         setTeachers(resultTeachers.results);

         const getTotalStudents = await apiService.fetchData("students", "GET");
         const resultStudents = await apiService.fetchData(`students/?limit=${getTotalStudents.totalItems}&offset=0`, "GET");

         setStudents(resultStudents.results);
      };
      getDataToCheckTeacherStudentEmail();
   }, []);


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
      
      if (!formData.email || !formData.password) {
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


      if (!formData.category || formData.category === "notanoption") {
         setFieldsRequired(true);
         return;
      };


      const studentEmailExists = students.some(student => student.email === formData.email);
      const teacherEmailExists = teachers.some(teacher => teacher.email === formData.email);
      
      if (formData.category === "student" && !studentEmailExists) {
         setFieldsRequired(false);

         setAlertMessage("User you are trying to introduce is not yet registered as a student!");
         setShowAlertMessage(true);
         return;

      } else if (formData.category === "teacher" && !teacherEmailExists) {
         setFieldsRequired(false);

         setAlertMessage("User you are trying to introduce is not yet registered as a teacher!");
         setShowAlertMessage(true);
         return;
      };
      

      const result = await apiService.fetchData("users", "POST", formData);
      console.log(result);
      setResult(result);

      setFieldsRequired(false);
      setShowAlertMessage(false);

      
      if (result.type === "WARNING") {
         setDialogMessageResult("User already exists!");
         setShowDialogMessageResult(true);

      } else {
         setFormData({
            email: "",
            password: "",
            category: ""
         });

         setShowCreateDialog(false);

         setDialogMessageResult("User created with success!");
         setShowDialogMessageResult(true);
      };
   };


   async function handleMessageResultButtonClick() {
      setShowDialogMessageResult(false);
      
      if (result.type !== "WARNING") {
         window.location.reload();
      };
   };


   async function handleCancelClick() {
      window.location.reload();
   };

 
   return (
        <>
            <dialog open={showCreateDialog}>
               <div className="dialogScroll">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <h1>CREATE NEW USER</h1>

                        <label>
                           EMAIL *
                           <input
                              placeholder="email"
                              type="email"
                              name="email"
                              maxLength="255"
                              value={formData.email}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           PASSWORD *
                           <input
                              placeholder="password"
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

                        <label>
                           CATEGORY *
                           <select
                           name="category"
                           value={formData.category}
                           onChange={(event) => handleChange(event)}
                           >
                              <option value="notanoption">select category</option>
                              <option value="admin">Admin</option>
                              <option value="student">Student</option>
                              <option value="teacher">Teacher</option>
                           </select>
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
                              CREATE
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


export default CreateUserForm;