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
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    reauthPassword: "", // New field for re-authentication
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        setError("No user data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data.");
    }
  };

  // Check if the username already exists in Firestore
  const checkIfUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Check if the email already exists in Firestore
  const checkIfEmailExists = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Email validator
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is authenticated, fetch the user data from Firestore
        fetchUserData(user.uid);
      } else {
        // Redirect to login if no user is authenticated
        router.push("/login");
      }
    });
  
    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const currentUser = auth.currentUser;

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
        // Send verification email for the new email address
        await sendEmailVerification(currentUser);
        setError(
          "A verification email has been sent to your email. Please verify before updating."
        );

        setIsLoading(false);
        return; // Stop here to wait for email verification
      }

      // Re-authenticate the user before updating the password
      if (formData.password) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formData.reauthPassword // Use the entered re-auth password
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

  if (!formData.username || !formData.email) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 flex items-center my-auto justify-center">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Update Profile
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}
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
              required
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
            <label htmlFor="confirmPassword" className="block font-semibold">
              Confirm Password:
            </label>
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
            {isLoading ? "Submitting..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
