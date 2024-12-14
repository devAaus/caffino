import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import { Authentication } from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

export default function CoffeeForm({ isAuthenticated }) {
   const [showModal, setShowModal] = useState(false);
   const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
   const [selectedCoffee, setSelectedCoffee] = useState(null);
   const [coffeeCost, setCoffeeCost] = useState(0);
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);

   const { user, globalData, setGlobalData } = useAuth()

   const handleSubmit = async () => {
      if (!isAuthenticated) {
         setShowModal(true)
         return
      }

      // a guard clause that only submits the form if it is completed
      if (!selectedCoffee) {
         return
      }

      try {
         const newGlobalData = {
            ...(globalData || {}),
         }

         const nowTime = Date.now()
         const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 100)
         const timeStamp = nowTime - timeToSubtract

         const newData = {
            name: selectedCoffee,
            cost: coffeeCost,
         }
         newGlobalData[timeStamp] = newData

         console.log(timeStamp, selectedCoffee, coffeeCost)

         // update the global data
         setGlobalData(newGlobalData)

         //persist the data in the firebase database
         const userRef = doc(db, 'users', user.uid)
         const res = await setDoc(userRef, {
            [timeStamp]: newData,
         }, { merge: true })

         setSelectedCoffee(null)
         setCoffeeCost(0)
         setHour(0)
         setMin(0)
      } catch (error) {
         console.log(error.message)
      }
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
