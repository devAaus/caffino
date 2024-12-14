import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import { Authentication } from "./Authentication";

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

export default function CoffeeForm({ isAuthenticated }) {
   const [showModal, setShowModal] = useState(false);
   const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
   const [selectedCoffee, setSelectedCoffee] = useState(null);
   const [coffeeCost, setCoffeeCost] = useState(0);
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);

   const handleSubmit = () => {
      if (!isAuthenticated) {
         setShowModal(true)
         return
      }
      console.log(selectedCoffee, coffeeCost, hour, min)
   }

   const handleCloseModal = () => setShowModal(false)

   return (
      <>
         {showModal && (
            <Modal handleCloseModal={handleCloseModal}>
               <Authentication handleCloseModal={handleCloseModal} />
            </Modal>
         )}
         <div className="section-header">
            <i className="fa-solid fa-pencil"></i>
            <h2>Start Tracking Today</h2>
         </div>
         <h4>Select coffee type</h4>
         <div className="coffee-grid">
            {coffeeOptions.slice(0, 5).map((option, index) => {
               return (
                  <button
                     onClick={() => {
                        setSelectedCoffee(option.name)
                        setShowCoffeeTypes(false)
                     }}
                     key={index}
                     className={"button-card " + (option.name === selectedCoffee ? ' coffee-button-selected' : ' ')}
                  >
                     <h4>{option.name}</h4>
                     <p>{option.caffeine} mg</p>
                  </button>
               )
            })}
            <button
               onClick={() => {
                  setShowCoffeeTypes(true)
                  setSelectedCoffee(null)
               }}
               className={"button-card " + (showCoffeeTypes ? ' coffee-button-selected' : ' ')}
            >
               <h4>Other</h4>
               <p>n/a</p>
            </button>
         </div>
         {showCoffeeTypes && (
            <select
               onChange={(e) => {
                  setSelectedCoffee(e.target.value)
               }}
               name="coffee-list"
               id="coffee-list"
            >
               <option value={null}>Select Coffee</option>
               {coffeeOptions.map((option, index) => {
                  return (
                     <option key={index} value={option.name}>
                        {option.name} ({option.caffeine} mg)
                     </option>
                  )
               })}
            </select>
         )}
         <h4>Add the cost ($)</h4>
         <input
            value={coffeeCost}
            onChange={(e) => {
               setCoffeeCost(e.target.value)
            }}
            type="number"
            placeholder="4.50"
            className="w-full"
         />
         <h4>Time since last coffee</h4>
         <div className="time-entry">
            <div>
               <h6>Hours</h6>
               <select
                  onChange={(e) => setHour(e.target.value)}
                  id="hours-select"
               >
                  {hours.map((hour, index) => {
                     return (
                        <option key={index} value={hour}>{hour}</option>
                     )
                  })}
               </select>
            </div>
            <div>
               <h6>Mins</h6>
               <select
                  onChange={(e) => setMin(e.target.value)}
                  id="mins-select"
               >
                  {mins.map((min, index) => {
                     return (
                        <option key={index} value={min}>{min}</option>
                     )
                  })}
               </select>
            </div>
         </div>
         <button onClick={handleSubmit}>
            <p>Add Entry</p>
         </button>
      </>
   )
}
