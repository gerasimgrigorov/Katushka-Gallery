"use client";

import { useState } from "react";
import Spinner from "../components/Spinner";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useRouter } from "next/navigation";
import { useUser } from "../utils/context/UserContext";

export default function ContactForm() {
  const { showAlert } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    priceRange: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10,15}$/; // Simple phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required.";
    } else if (formData.projectDescription.length < 50){
      newErrors.projectDescription = "The message have to be at least 50 symbols.";
    }

    if (!formData.priceRange || formData.priceRange <= 0) {
      newErrors.priceRange = "Please enter a valid price.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const contactData = {
      ...formData,
      timestamp: new Date(),
    };

    setIsLoading(true);

    try {
      await addDoc(collection(db, "contacts"), contactData);
      router.push("/");
      showAlert("You successfully submitted your message.", "success");
    } catch (e) {
      console.log("An error occurred.", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-center mb-6">Let's Create Something</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mx-auto w-full sm:w-2/3 lg:w-2/4"
      >
        <div className="flex flex-col space-y-1">
          <label className="block font-semibold" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className={`normal-font-styling border p-2 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="block font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className={`normal-font-styling border p-2 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="flex flex-wrap space-y-1 sm:space-y-0 sm:space-x-0 md:space-x-4">
          <div className="flex-1 flex flex-col space-y-1">
            <label className="block font-semibold" htmlFor="phone">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone"
              className={`normal-font-styling border p-2 rounded-md ${
                errors.phone ? "border-red-500" : ""
              }`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <div className="flex-1 flex flex-col space-y-1">
            <label className="block font-semibold" htmlFor="priceRange">
              Budget:
            </label>
            <div className="flex items-center">
              <span className="input-group-text border border-r-0 font-semibold rounded-md rounded-r-none p-2 bg-gray-100">
                $
              </span>
              <input
                type="number"
                id="priceRange"
                name="priceRange"
                placeholder="Enter Price"
                className={`normal-font-styling border p-2 rounded-md rounded-l-none flex-1 ${
                  errors.priceRange ? "border-red-500" : ""
                }`}
                value={formData.priceRange}
                onChange={handleChange}
              />
            </div>
            {errors.priceRange && (
              <p className="text-red-500">{errors.priceRange}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="block font-semibold" htmlFor="projectDescription">
            Project Description:
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            placeholder="Describe your vision or project"
            rows="6"
            className={`normal-font-styling border p-2 rounded-md ${
              errors.projectDescription ? "border-red-500" : ""
            }`}
            value={formData.projectDescription}
            onChange={handleChange}
          />
          {errors.projectDescription && (
            <p className="text-red-500">{errors.projectDescription}</p>
          )}
        </div>

        <button
          type="submit"
          className="style-the-button w-full mt-4 py-2 text-white px-auto rounded-md shadow-lg transition-all duration-300 ease-in-out transform disabled:bg-gray-500"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Send Message"}
        </button>
      </form>
    </div>
  );
}
