"use client";

import { useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const checkIfUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      setIsLoading(false);
      setError("Invalid email format!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      setError("Passwords do not match!");
      return;
    }

    try {
      const usernameExists = await checkIfUsernameExists(formData.username);
      if (usernameExists) {
        setIsLoading(false);
        setError("Username already exists!");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        username: formData.username,
        email: user.email,
        role: "customer",
      };

      setIsLoading(false);
      await setDoc(doc(db, "users", user.uid), userDoc);
      router.push("/");

      // alert("Registration successful!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setIsLoading(false);
        setError("Email already exists!");
      } else {
        setIsLoading(false);
        console.dir(error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 flex items-center my-auto justify-center">
      <div className="w-full max-w-md bg-white sm:shadow-lg p-1 sm:p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="block font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your Username"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="block font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="block font-semibold">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 disabled:bg-gray-500"
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-800 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
