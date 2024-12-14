import { useState } from "react";
import { Authentication } from "./Authentication";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal";

export default function Layout({ children }) {
   const [showModal, setShowModal] = useState(false)

   return (
      <>
         {showModal && (
            <Modal handleCloseModal={() => setShowModal(false)}>
               <Authentication handleCloseModal={() => setShowModal(false)} />
            </Modal>
         )}
         <Header setShowModal={setShowModal} />
         <main>{children}</main>
         <Footer />
      </>
   )
}
