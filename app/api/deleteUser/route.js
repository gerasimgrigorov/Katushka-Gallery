import { auth, db } from "@/app/services/firebaseConfig"; // Adjust the import path as necessary
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function DELETE(request) {
  const { uid } = await request.json(); // Assuming uid is passed in the body
  // console.log("Auth", auth)
  try {
    // Verify the user making the request
    // const user = auth.currentUser; // Get the current authenticated user
    // if (!user) {
    //   return new Response(JSON.stringify({ error: "You do not have permission to delete users." }), { status: 401 });
    // }

    // Fetch the user's role from Firestore to ensure they are an admin
    // const adminDoc = await getDoc(doc(db, "users", user.uid));
    // if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
    //   return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    // }

    await deleteDoc(doc(db, "users", uid));

    // Delete user from Firebase Authentication
    // await deleteUser(auth.currentUser); 

    return new Response(JSON.stringify({ message: "User deleted successfully.", type: "success" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error); // Log the error for debugging
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
