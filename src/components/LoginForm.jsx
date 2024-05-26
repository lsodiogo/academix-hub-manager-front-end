function LoginForm({ email, setEmail, password, setPassword, rememberMe, setRememberMe, loginPost }) {

   
   return (
      <>
         <form onSubmit={loginPost}>
            <fieldset className="grid">
               <label>
                  Email
                  <input
                     placeholder="email"
                     type="email"
                     name="email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     required
                  />
               </label>

               <label>
                  Password
                  <input
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
               <label>
                  <input
                     type="checkbox"
                     role="switch"
                     name="remember"
                     checked={rememberMe}
                     onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember me
               </label>

               <label>
                  <button type="submit">
                     LOGIN
                  </button>
               </label>
            </fieldset>
         </form>
      </>
   );
};


export default LoginForm;