"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authFunctions";
import Spinner from "../components/Spinner";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex items-center my-auto justify-center">
      <div className="w-full max-w-md bg-white sm:shadow-lg p-1 sm:p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="block font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 disabled:bg-gray-500"
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-red-800 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
