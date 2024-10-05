"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "../utils/context/UserContext";
import Link from "next/link";

// const paintingsInCart = [
//   {
//     id: "14n15o",
//     path: "/images/Lost-in-the-dark.jpg",
//     name: "Lost in the dark",
//     width: 1080,
//     height: 1296,
//     price: 174.99,
//     category: "Fantasy",
//   },
//   {
//     id: "16p17q",
//     path: "/images/Magic-archer.jpg",
//     name: "Magic archer",
//     width: 1080,
//     height: 1080,
//     price: 139.99,
//     category: "Surrealism",
//   },
// ];

export default function CartPage() {
  const { cart, handleRemove } = useUser();
  // console.log(cart);

  const isEmpty = cart.length === 0;
  // console.log(isEmpty)
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    additionalMessage: "",
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const shippingPrice = 6.99;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center mb-6">Your Cart</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6 px-4">
        {isEmpty ? (
          <p className="text-red-600">Your cart is empty.</p>
        ) : (
          cart.map((painting) => (
            <div
              key={painting.id}
              className="flex flex-col items-center shadow-xl p-4 rounded-lg max-w-xs"
            >
              <Link key={painting.id} href={`/gallery/${painting.id}`}>
                <div className="text-center">
                  <Image
                    src={painting.path}
                    alt={painting.name}
                    width={260}
                    height={(painting.height / painting.width) * 260}
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-lg">{painting.name}</p>
                  <p className="text-sm">${painting.price.toFixed(2)}</p>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(painting.id)}
                className="mt-2 d-block text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {!isEmpty && (<form className="space-y-4 mb-6 max-w-lg mx-auto">
        <h2 className="text-2xl text-center mb-4">Shipping Information</h2>
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
        </div>
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
        </div>
        <div>
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
        </div>
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
        </div>
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

        <div className="max-w-lg mx-auto mb-4">
          <div className="flex justify-between items-center">
            <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
            <p className="text-lg">Shipping: ${shippingPrice.toFixed(2)}</p>
          </div>
          <div className="text-lg font-bold">
            <p>Grand Total: ${(totalPrice + shippingPrice).toFixed(2)}</p>
          </div>
        </div>
        <div className="rounded-md bg-purple-500">
          <p className="normal-font-styling text-white text-center text-xs p-2 "><em>Currently, the only payment methon is cash on delivery. Be patient with your orders.</em></p>
        </div>
        <button
          disabled={isEmpty}
          className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 disabled:bg-gray-600"
        >
          Checkout
        </button>
      </form>)}
    </div>
  );
}
