function LoginForm({ email, setEmail, password, setPassword, rememberMe, setRememberMe, loginPost }) {

   
   return (
      <>
         <form className="login-form" onSubmit={loginPost}>
            <fieldset className="input-field">
               <label className="input-label">
                  Email
                  <input className="input-text"
                     placeholder="email"
                     type="email"
                     name="email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     required
                  />
               </label>

               <label className="input-label">
                  Password
                  <input className="input-text"
                     placeholder="password"
                     type="password"
                     name="password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     required
                  />
               </label>
            </fieldset>

            <fieldset>
               <label className="input-label">
                  Remember me
                  <input className="checkbox"
                     type="checkbox"
                     role="switch"
                     name="remember"
                     checked={rememberMe}
                     onChange={(event) => setRememberMe(event.target.checked)}
                  />
               </label>

               <label>
                  <button className="submit-button" type="submit">
                     <span>LOGIN </span>
                     <img src="./images/login.svg" alt="login-icon"/>
                  </button>
               </label>
            </fieldset>

            <div className="message-test-container">
               <div>This message is only for purpose of marketing test.</div>
               <div>Use the following email and password to test the application:</div>
               <div className="font-style">admin@admin.com | test</div>
               <div className="font-style">student@student.com | test</div>
               <div className="font-style">teacher@teacher.com | test</div>
               <div>Enjoy!</div>
            </div>
         </form>
      </>
   );
};


export default LoginForm;