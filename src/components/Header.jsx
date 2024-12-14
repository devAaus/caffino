import { useAuth } from "../context/AuthContext"

export default function Header({ setShowModal }) {
   const { user, logout } = useAuth()
   return (
      <header>
         <div>
            <h1 className="text-gradient">Caffino</h1>
            <p>For Coffee Fiends</p>
         </div>
         {user ? (
            <button onClick={logout}>
               <p>Logout</p>
            </button>
         ) : (
            <button onClick={() => setShowModal(true)}>
               <p>Sign In</p>
               <i className="fa-solid fa-mug-hot"></i>
            </button>
         )}
      </header >
   )
}