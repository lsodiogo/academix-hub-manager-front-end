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
                     LOGIN
                  </button>
               </label>
            </fieldset>
         </form>
      </>
   );
};


export default LoginForm;