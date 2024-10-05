"use client";

import { useState, useEffect } from "react";
import { getAllPaintings } from "../utils/getAllPaintings";
import { db } from "../services/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { imageGallery } from "../utils/imageGallery";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const allPaintings = getAllPaintings(imageGallery);
  const [paintings, setPaintings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filteredPaintings, setFilteredPaintings] = useState(allPaintings);

  useEffect(() => {
    async function fetchPaintings() {
      const querySnapshot = await getDocs(collection(db, "paintings"));
      const paintingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(paintingsData);
      setPaintings(paintingsData);
    }

    fetchPaintings();
    if (allPaintings.length > 0) {
      setMinPrice(Math.min(...allPaintings.map((p) => p.price)));
      setMaxPrice(Math.max(...allPaintings.map((p) => p.price)));
    }
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
    const filtered = allPaintings.filter((painting) => {
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
          className="border rounded-lg p-2 mx-4 mb-1 md:mx-1 md:mb-2"
        >
          <option value="all">All Categories</option>
          <option value="Surrealism">Surrealism</option>
          <option value="Abstract">Abstract</option>
          <option value="Fantasy">Fantasy</option>
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          className="border rounded-lg p-2 mx-4 mb-1 md:mx-1 md:mb-2"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          className="border rounded-lg p-2 mx-4 mb-1 md:mx-1 md:mb-2"
        />

        <button
          onClick={applyFilters}
          className="border rounded-lg p-2 bg-purple-800 hover:bg-purple-900 text-white mx-4 transition duration-300 mb-1 md:mx-1 md:mb-2"
        >
          Filter
        </button>
      </div>

      {paintings.length > 0 ? (
        <div>
          {paintings.map((painting) => {
            return <Link key={painting.id} href={`/gallery/${painting.id}`}>
              <div className="flex flex-col items-center mb-2 transition-transform transform hover:scale-105">
                <Image
                  src={painting.imageUrl}
                  alt={painting.name}
                  width={260}
                  height={260}
                  className="shadow-lg"
                />
                <p className="mt-2 text-center text-lg">{painting.name}</p>
                <p className="text-center text-sm">
                  ${painting.price.toFixed(2)}
                </p>
              </div>
            </Link>;
          })}
        </div>
      ) : (
        <p>Something went wrong. Cannot fetch the paintings.</p>
      )}

      {filteredPaintings.length === 0 ? (
        <p>No results found. Please adjust your filters.</p>
      ) : (
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 px-2 gap-6 lg:gap-6 2xl:gap-2 2xl:mx-12 sm:px-4 xl:px-14">
          {filteredPaintings.map((painting) => (
            <Link key={painting.id} href={`/gallery/${painting.id}`}>
              <div className="flex flex-col items-center mb-2 transition-transform transform hover:scale-105">
                <Image
                  src={painting.path}
                  alt={painting.name}
                  width={260}
                  height={260}
                  className="shadow-lg"
                />
                <p className="mt-2 text-center text-lg">{painting.name}</p>
                <p className="text-center text-sm">
                  ${painting.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
