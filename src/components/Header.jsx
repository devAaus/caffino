export default function Header({ setShowModal }) {
   return (
      <header>
         <div>
            <h1 className="text-gradient">Caffino</h1>
            <p>For Coffee Fiends</p>
         </div>
         <button onClick={() => setShowModal(true)}>
            <p>Sign In</p>
            <i className="fa-solid fa-mug-hot"></i>
         </button>
      </header>
   )
}