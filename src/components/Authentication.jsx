import { useState } from "react"


export const Authentication = () => {
   const [isRegistration, setIsRegistration] = useState(false)
   const [isAuthenticating, setIsAuthenticating] = useState(false)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")


   const handleAuthenticate = async () => {

   }

   return (
      <>
         <h2 className="sign-up-text">
            {isRegistration ? "Sign Up" : "Login"}
         </h2>
         <p>
            {isRegistration
               ? "Create an account"
               : "Sign in to your account"
            }
         </p>
         <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
         />
         <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
         />
         <button onClick={handleAuthenticate}>
            <p>Submit</p>
         </button>
         <hr />
         <div className="register-content">
            <p>
               {isRegistration
                  ? "Already have an account?"
                  : "Don't have an account?"
               }
            </p>
            <button
               onClick={() => setIsRegistration(!isRegistration)}
            >
               <p>{isRegistration ? "Login" : "Sign Up"}</p>
            </button>
         </div>
      </>
   )
}
