"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  updateEmail,
  updatePassword,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../utils/context/UserContext"; // Importing the User Context
import Spinner from "../components/Spinner";

export default function Profile() {
  const { currentUser, showAlert } = useUser(); // Accessing currentUser from context
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    reauthPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData((prevData) => ({
          ...prevData,
          username: docSnap.data().username,
          email: docSnap.data().email,
        }));
      } else {
        showAlert("User data not found. It may have been deleted.");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    } else {
      router.push("/login");
    }
  }, [currentUser, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Input validations
    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      setIsLoading(false);
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      // Check if username has changed
      if (formData.username !== currentUser.displayName) {
        const usernameExists = await checkIfUsernameExists(formData.username);
        if (usernameExists) {
          setError("Username already exists!");
          setIsLoading(false);
          return;
        }
      }

      // Handle email changes - Send verification before updating
      if (formData.email !== currentUser.email) {
        await sendEmailVerification(currentUser);
        setError("A verification email has been sent. Please verify before updating.");
        setIsLoading(false);
        return;
      }

      // Re-authenticate the user before updating the password
      if (formData.password) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formData.reauthPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, formData.password);
      }

      // Update Firestore user document
      await updateDoc(doc(db, "users", currentUser.uid), {
        username: formData.username,
        email: formData.email,
      });

      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setError(`Failed to update profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // While loading the component, show a loading message
  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  // If the user data is not available, show an appropriate message
  if (!formData.username || !formData.email) {
    return <p className="text-center mt-4">User data not available.</p>;
  }

  return (
    <div className="container mx-auto p-6 flex items-center my-auto justify-center">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Update Profile</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="block font-semibold">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your Username"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="block font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="block font-semibold">
              Password (Leave blank if you don't want to change):
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="block font-semibold">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your New Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="reauthPassword" className="block font-semibold">
              Please enter your password to confirm changes:
            </label>
            <input
              type="password"
              id="reauthPassword"
              name="reauthPassword"
              placeholder="Current Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.reauthPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 disabled:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? <Spinner/> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
