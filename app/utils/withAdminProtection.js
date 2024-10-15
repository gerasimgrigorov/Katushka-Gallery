import { useUser } from "./context/UserContext"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAdminProtection = (WrappedComponent) => {
  const AdminProtectedComponent = (props) => {
    const { currentUser, showAlert } = useUser();
    const router = useRouter();
    
    useEffect(() => {
      if (!currentUser || currentUser.role !== "admin") {
        showAlert("Unauthorized.");
        router.push("/"); 
      }
    }, [currentUser, router, showAlert]);

    if (currentUser && currentUser.role === "admin") {
      return <WrappedComponent {...props} />;
    }

    return null;   };

  // display name for easier debugging
  AdminProtectedComponent.displayName = `withAdminProtection(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AdminProtectedComponent;
};

export default withAdminProtection;
