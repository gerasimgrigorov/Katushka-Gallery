"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "../utils/context/UserContext";
import { TbTruckDelivery } from "react-icons/tb";
import { db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, setCart, showAlert } = useUser();
  const isEmpty = cart.length === 0;
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    zip: "",
    phone: "",
    address: "",
    additionalMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const shippingPrice = 6.99;

  const validateForm = () => {
    let tempErrors = {};
    if (!shippingInfo.name) tempErrors.name = "Name is required.";
    if (!shippingInfo.email) tempErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
      tempErrors.email = "Invalid email address.";
    if (!shippingInfo.zip) tempErrors.zip = "Zip code is required.";
    if (!shippingInfo.phone) tempErrors.phone = "Phone number is required.";
    if (!shippingInfo.address)
      tempErrors.address = "Shipping address is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting order: ", {
      userDetails: shippingInfo,
      orderedItems: cart,
      totalPrice: totalPrice + shippingPrice,
      timestamp: new Date(),
    });
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "orders"), {
        userDetails: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          zip: shippingInfo.zip,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          additionalMessage: shippingInfo.additionalMessage,
        },
        orderedItems: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          // image: item.imageUrl
        })),
        status: "Pending",
        totalPrice: (totalPrice + shippingPrice).toFixed(2),
        timestamp: new Date(),
      });
      showAlert("Order successfully placed!", "success");
      setCart([]);
      router.push("/");
    } catch (error) {
      showAlert("An error occured placing your order.");
      console.error("Error placing order: ", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center">Your Cart</h1>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        {isEmpty ? (
          <p className="text-red-600">Your cart is empty.</p>
        ) : (
          cart.map((painting) => (
            <div
              key={painting.id}
              className="cart-painting flex flex-col items-center p-4 rounded-lg"
            >
              <Link key={painting.id} href={`/gallery/${painting.id}`}>
                <div className="text-center">
                  <Image
                    src={painting.imageUrl}
                    alt={painting.name}
                    width={260}
                    height={260}
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-lg text-clip">{painting.name}</p>
                  <p className="text-sm">${painting.price.toFixed(2)}</p>
                </div>
              </Link>
              <button
                onClick={() => removeFromCart(painting.id)}
                className="mt-2 d-block text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {!isEmpty && (
        <form
          className="space-y-4 mb-6 max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center mb-4">Shipping Information</h2>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="normal-font-styling border p-2 w-full rounded-md"
              value={shippingInfo.name}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="normal-font-styling border p-2 w-full rounded-md"
              value={shippingInfo.email}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Zip and Phone */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label htmlFor="zip" className="block font-semibold">
                Zip Code:
              </label>
              <input
                type="text"
                id="zip"
                placeholder="Zip Code"
                className="normal-font-styling border p-2 w-full rounded-md"
                value={shippingInfo.zip}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, zip: e.target.value })
                }
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="block font-semibold">
                Your Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Your Phone Number"
                className="normal-font-styling border p-2 w-full rounded-md"
                value={shippingInfo.phone}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block font-semibold">
              Shipping Address:
            </label>
            <input
              type="text"
              id="address"
              placeholder="Shipping Address"
              className="normal-font-styling border p-2 w-full rounded-md"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Additional Message */}
          <div>
            <label htmlFor="additionalMessage" className="block font-semibold">
              Additional Message (Optional):
            </label>
            <textarea
              id="additionalMessage"
              placeholder="Additional Message..."
              className="normal-font-styling border p-2 w-full rounded-md"
              rows="4"
              value={shippingInfo.additionalMessage}
              onChange={(e) =>
                setShippingInfo({
                  ...shippingInfo,
                  additionalMessage: e.target.value,
                })
              }
            />
          </div>

          {/* Payment Section */}
          <hr className="my-3" />
          <div className="text-start">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="border p-2 rounded-md">
                <TbTruckDelivery className="text-3xl" />
              </div>
              <p className="text-lg">Cash on delivery</p>
            </div>
          </div>
          <hr className="my-3" />

          <div className="max-w-lg mx-auto mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
              <p className="text-lg">Shipping: ${shippingPrice.toFixed(2)}</p>
            </div>
            <div className="text-lg font-bold">
              <p>Grand Total: ${(totalPrice + shippingPrice).toFixed(2)}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            disabled={isEmpty || isSubmitting}
            className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 disabled:bg-gray-600"
          >
            {isSubmitting ? "Placing Order..." : "Checkout"}
          </button>
        </form>
      )}
    </div>
  );
}
