"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    priceRange: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-center mb-6">Let's Create Something</h2>
      <form className="space-y-4 mx-auto w-full sm:w-2/3 lg:w-2/4">
        <div className="flex flex-col space-y-2">
          <label className="block font-semibold" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="normal-font-styling border p-2 rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block font-semibold" htmlFor="email">
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
        <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-0 md:space-x-4">
          <div className="flex-1 flex flex-col space-y-2">
            <label className="block font-semibold" htmlFor="phone">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone"
              className="normal-font-styling border p-2 rounded-md"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <label className="block font-semibold" htmlFor="priceRange">
              Budget:
            </label>
            <div className="flex items-center">
              <span className="input-group-text border border-r-0 font-semibold rounded-md rounded-r-none p-2 bg-gray-100">
                $
              </span>
              <input
                type="text"
                id="priceRange"
                name="priceRange"
                placeholder="Enter Price"
                className="normal-font-styling border p-2 rounded-md rounded-l-none flex-1"
                value={formData.priceRange}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block font-semibold" htmlFor="projectDescription">
            Project Description:
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            placeholder="Describe your vision or project"
            rows="6"
            className="normal-font-styling border p-2 rounded-md"
            value={formData.projectDescription}
            onChange={handleChange}
          />
        </div>
        <button className="style-the-button w-full mt-4 py-2 text-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform">
          Send Message
        </button>
      </form>
    </div>
  );
}
