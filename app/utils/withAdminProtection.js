import { useUser } from "./context/UserContext"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAdminProtection = (WrappedComponent) => {
  return (props) => {
    const { currentUser, showAlert } = useUser(); // Access user context
    const router = useRouter();
    console.log(currentUser)
    useEffect(() => {
      // Check if the user is authenticated and has admin role
      if (!currentUser || currentUser.role !== "admin") {
        showAlert("Unauthorized.")
        router.push("/"); // Redirect to home or another page if not admin
      }
    }, [currentUser, router, showAlert]);

    // Render the wrapped component if the user is an admin
    if (currentUser && currentUser.role === "admin") {
      return <WrappedComponent {...props} />;
    }

    return null; // Optionally, you could return a loading state or nothing
  };
};

export default withAdminProtection;
