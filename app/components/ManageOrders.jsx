"use client";

import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig"; 
import { doc, updateDoc, collection, getDocs, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";

export default function ManageOrders() {
  const { showAlert } = useUser()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const q = query(collection(db, "paintings"), where("orderId", "==", orderId));
    const paintingsSnapshot = await getDocs(q);
  
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  
    if (newStatus === "Delivered") {
      paintingsSnapshot.forEach(async (painting) => {
        const paintingRef = doc(db, "paintings", painting.id);
        await updateDoc(paintingRef, { status: "Sold" });
      });
    } else if (newStatus === "Cancelled") {
      paintingsSnapshot.forEach(async (painting) => {
        const paintingRef = doc(db, "paintings", painting.id);
        await updateDoc(paintingRef, { status: "Available", orderId: null });
      });
    } else if (newStatus === "Pending" || "Shipped"){
      paintingsSnapshot.forEach(async (painting) => {
        const paintingRef = doc(db, "paintings", painting.id);
        await updateDoc(paintingRef, { status: "Ordered" });
      });
    }

    showAlert("Order status updated successfully.", "success")
  
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };  

  const deleteOrder = async (orderId) => {
    const q = query(collection(db, "paintings"), where("orderId", "==", orderId))
    const paintingsSnapshot = await getDocs(q)

    paintingsSnapshot.forEach(async (painting) => {
      const paintingRef = doc(db, "paintings", painting.id)
      await updateDoc(paintingRef, { status: "Available", orderId: null})
    })

    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    showAlert("Deleted order successfully.", "success")
  };

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="sm:p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4 text-start">Orders List</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-md bg-white">
              <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.userDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {order.userDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.userDetails.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.userDetails.address}, {order.userDetails.zip}
              </p>

              <h4 className="mt-4 font-semibold">Ordered Paintings:</h4>
              <ul className="list-disc ml-6">
                {order.orderedItems.map((painting) => (
                  <li key={painting.id}>
                    {painting.name} - ${painting.price.toFixed(2)}
                  </li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>

              <p className="mt-2">
                <strong>Additional Message:</strong>{" "}
                {order.additionalMessage || "No additional message."}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <label htmlFor={`status-${order.id}`} className="block font-semibold mb-1">
                    Update Order Status:
                  </label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border p-2 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="ml-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-500"
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
