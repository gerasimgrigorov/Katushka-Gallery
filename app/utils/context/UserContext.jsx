"use client"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/services/firebaseConfig"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export default function UserProvider({children}){
  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([])

  function addToCart(painting){
    setCart((prevState) => [...prevState, painting])
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)

      if(user){
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{currentUser, cart, addToCart}}>
      {children}
    </UserContext.Provider>
  )
}