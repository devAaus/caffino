import { useState } from "react"
import { useAuth } from "../context/AuthContext"


export const Authentication = () => {
   const [isRegistration, setIsRegistration] = useState(false)
   const [isAuthenticating, setIsAuthenticating] = useState(false)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const { signup, login } = useAuth()

   const handleAuthenticate = async () => {
      if (!email || !password) return
      if (isAuthenticating) return

      try {
         setIsAuthenticating(true)
         if (isRegistration) {
            //signup
            await signup(email, password)
         } else {
            //login
            await login(email, password)
         }
      } catch (error) {
         console.log(error.message);
      } finally {
         setIsAuthenticating(false)
      }
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
            <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
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
