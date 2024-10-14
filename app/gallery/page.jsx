"use client";

import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import Image from "next/image";
import Painting from "../components/Painting";
import Link from "next/link";
import PaintingsGrid from "../components/PaintingsGrid";

export default function Page() {
  const [paintings, setPaintings] = useState([]);
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchPaintings() {
      setLoading(true); // Set loading to true before fetching
      const querySnapshot = await getDocs(collection(db, "paintings"));
      const paintingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPaintings(paintingsData);
      setFilteredPaintings(paintingsData); // Initialize filtered paintings with all paintings

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(paintingsData.map((painting) => painting.category)),
      ];
      setCategories(uniqueCategories);

      // Set initial price range
      if (paintingsData.length > 0) {
        setMinPrice(Math.min(...paintingsData.map((p) => p.price)));
        setMaxPrice(Math.max(...paintingsData.map((p) => p.price)));
      }
      setLoading(false); // Set loading to false after fetching
    }

    fetchPaintings();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value) || 0);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value) || 0);
  };

  const applyFilters = () => {
    const filtered = paintings.filter((painting) => {
      const inPriceRange =
        painting.price >= minPrice && painting.price <= maxPrice;
      const inCategory =
        selectedCategory === "all" || painting.category === selectedCategory;
      return inPriceRange && inCategory;
    });
    setFilteredPaintings(filtered);
  };

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl mb-4">Gallery</h1>

      <div className="flex flex-col md:flex-row w-full max-w-3xl justify-center">
        <select
          onChange={handleCategoryChange}
          className="border rounded-lg p-2 mx-12 mb-1 md:mx-1 md:mb-2"
        >
          <option value="all">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          className="border rounded-lg p-2 mx-12 mb-1 md:mx-1 md:mb-2"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          className="border rounded-lg p-2 mx-12 mb-1 md:mx-1 md:mb-2"
        />

        <button
          onClick={applyFilters}
          className="border rounded-lg p-2 bg-violet-800 hover:bg-violet-700 text-white mx-12 transition duration-300 mb-1 md:mx-1 md:mb-2"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading paintings...</p>
      ) : filteredPaintings.length > 0 ? (
        <PaintingsGrid>
          {filteredPaintings.map((painting) => (
            <Painting key={painting.id} painting={painting} />
          ))}
        </PaintingsGrid>
      ) : (
        <p>No results found. Please adjust your filters.</p>
      )}
    </div>
  );
}
