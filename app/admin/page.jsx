"use client";

import { useState } from "react";
import AddPainting from "../components/ManagePaintings"; // Import the AddPainting component
import ManageUsers from "../components/ManageUsers"; // Placeholder for Manage Users
import withAdminProtection from "../utils/withAdminProtection";
import ManageOrders from "../components/ManageOrders"; // Placeholder for Manage Orders

function Page() {
  const [activeTab, setActiveTab] = useState("managePaintings"); // Default active tab

  const renderActiveTab = () => {
    switch (activeTab) {
      case "managePaintings":
        return <AddPainting />;
      case "manageUsers":
        return <ManageUsers />;
      case "manageOrders":
        return <ManageOrders />;
      default:
        return <AddPainting />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center mb-4">Admin Panel</h1>
      <div className="flex justify-around sm:justify-center mb-4">
        <button
          className={`px-3 mr-1 sm:mr-2 py-2 rounded-md text-sm sm:text-md ${
            activeTab === "managePaintings"
              ? "bg-violet-800 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("managePaintings")}
        >
          Manage Paintings
        </button>
        <button
          className={`px-3 py-2 rounded-md text-sm sm:text-md ${
            activeTab === "manageUsers"
              ? "bg-violet-800 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("manageUsers")}
        >
          Manage Users
        </button>
        <button
          className={`px-3 ml-1 sm:ml-2 py-2 rounded-md text-sm sm:text-md ${
            activeTab === "manageOrders"
              ? "bg-violet-800 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("manageOrders")}
        >
          Manage Orders
        </button>
      </div>

      <div className="bg-white">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default withAdminProtection(Page);
