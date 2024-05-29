import { useEffect, useState } from "react";

import apiService from "../../services/apiService";


function CreateUserForm({ showCreateDialog, setShowCreateDialog }) {

   const [formData, setFormData] = useState({
      email: "",
      password: "",
      category: ""
   });
   
   const [teachers, setTeachers] = useState([]);
   const [students, setStudents] = useState([]);
   
   const [showPassword, setShowPassword] = useState(false);
   const [fieldsRequired, setFieldsRequired] = useState(false);
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
      
      if (!formData.email || !formData.password || !formData.category || formData.category === "notanoption") {
         setFieldsRequired(true);
         return;
      };


      const strength = getPasswordStrength(formData.password);

      if (!strength.length || !strength.lowercase || !strength.uppercase || !strength.number || !strength.specialCharacter) {
         setDialogMessageResult("Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
         setShowDialogMessageResult(true);
         return;
      }


      const studentEmailExists = students.some(student => student.email === formData.email);
      const teacherEmailExists = teachers.some(teacher => teacher.email === formData.email);
      
      if (formData.category === "student" && !studentEmailExists) {
         setFieldsRequired(false);

         setDialogMessageResult("User you are trying to introduce is not yet registered as a student!");
         setShowDialogMessageResult(true);
         return;

      } else if (formData.category === "teacher" && !teacherEmailExists) {
         setFieldsRequired(false);

         setDialogMessageResult("User you are trying to introduce is not yet registered as a teacher!");
         setShowDialogMessageResult(true);
         return;
      };
      

      const result = await apiService.fetchData("users", "POST", formData);
      console.log(result);

      setFieldsRequired(false);

      
      if (result.error === "WARNING") {
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

 
   return (
        <>
            <dialog open={showCreateDialog}>
               <div className="dialogScroll">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <h2>Create new user</h2>

                        <label>
                           Email *
                           <input
                              type="email"
                              name="email"
                              maxLength="255"
                              value={formData.email}
                              onChange={(event) => handleChange(event)}
                           />
                        </label>

                        <label>
                           Password *
                           <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              minLength="8"
                              maxLength="18"
                              value={formData.password}
                              onChange={(event) => handleChange(event)}
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
                           Category *
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
                           <div className="fieldsRequired">
                           * fields required!
                           </div>
                        }

                        <div>
                           <button type="submit">
                              CREATE
                           </button>
                           <button type="button" onClick={() => setShowCreateDialog(false)}>
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
                  <button onClick={() => setShowDialogMessageResult(false)}>OK</button>
               </div>
            </dialog>
        </>
   );
};


export default CreateUserForm;