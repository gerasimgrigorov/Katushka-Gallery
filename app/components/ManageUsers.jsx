"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { deleteUser, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../utils/context/UserContext";

export default function ManageUsers() {
  const { showAlert } = useUser();
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchUsers = async () => {
    setIsLoading(true); // Set loading state
    try {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      showAlert("Error fetching users.", "error");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const fetchCurrentUserRole = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        setIsAdmin(role === "admin"); // Set isAdmin based on user's role
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserRole(); // Fetch the current user's role on mount
  }, [fetchUsers]);

  const handleRoleChange = async (id, newRole) => {
    if (!isAdmin) {
      showAlert("You do not have permission to change user roles.");
      return;
    }

    try {
      const userDoc = doc(db, "users", id);
      const currentUserDoc = await getDoc(userDoc);
      const currentRole = currentUserDoc.data().role; // Get current role

      if (currentRole !== newRole) {
        await updateDoc(userDoc, { role: newRole });
        showAlert("User role updated successfully.", "success");
        fetchUsers(); // Refresh users after update
      }
    } catch (error) {
      console.error("Error updating user role: ", error);
      showAlert("Error updating user role.", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!isAdmin) {
      showAlert("You do not have permission to change user roles.");
      return;
    }

    try {
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      const data = await response.json();
      showAlert(data.message, data.type);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showAlert(error.message, "error"); // Show error alert
    }
  };

  if (isLoading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="sm: p-4 max-w-4xl mx-auto">
      {/* <h2 className="text-2xl text-center mb-4">Manage Users</h2> */}

      <h3 className="text-2xl mb-4">User List</h3>
      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-md shadow-sm"
            >
              <div>
                <strong>{user.username}</strong> <br />
                <span>{user.email}</span>
              </div>
              <div>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border p-2 sm:mx-0 rounded-md w-full sm:w-auto"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="sm:ml-4 mt-2 sm:mt-0 bg-red-500 text-white p-2 rounded-md w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
