"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center my-auto justify-center">
      <div className="text-center bg-gray-100 py-14 px-20 rounded-md">
        <h1 className="text-6xl font-bold text-red-800">404</h1>
        <p className="text-xl font-medium mt-4">Oops! Page Not Found</p>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or was moved.
        </p>
        <div className="mt-6">
          <Link href="/">
            <span className="px-6 py-3 bg-red-800 text-white rounded-full shadow-md hover:bg-red-600 duration-300">
              Go Back Home
            </span>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/gallery">
            <span className="px-6 py-2 text-red-800 hover:underline">
              View Paintings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
