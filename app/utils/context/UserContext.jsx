"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/services/firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(null);
  const pathname = usePathname(); // get the current path

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")

    if(storedCart){
      setCart(JSON.parse(storedCart))
    }
  }, [])

  function showAlert(message, type = "default") {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  function removeFromCart(id) {
    const updatedCart = (cart.filter((item) => item.id !== id));
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }


  function addToCart(painting) {
    const alreadyAdded = cart.find(
      (currPainting) => currPainting.id === painting.id
    );

    if (alreadyAdded) {
      showAlert("This painting is already in the cart.");
      return;
    }

    if(cart.length === 3){
      showAlert("The maximumm quantity is 3.")
      return
    }

    const updatedCart = [...cart, painting];
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        setCurrentUser({...user, role: userDoc.data().role });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // clear alert on route change
  // useEffect(() => {
  //   setAlert(null);
  // }, [pathname]);

  return (
    <UserContext.Provider
      value={{ currentUser, cart, setCart, addToCart, showAlert, removeFromCart }}
    >
      <div className="fixed bottom-5 left-5 z-50">
        {alert && (
          <div
            className={`max-w text-white px-4 py-2 transition-opacity duration-500 ease-in-out rounded-lg shadow-lg
              ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            <p>{alert.message}</p>
          </div>
        )}
      </div>
      {children}
    </UserContext.Provider>
  );
}
