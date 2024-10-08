"use client";

import Link from "next/link";
import { db } from "@/app/services/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
// import { imageGallery } from "@/app/utils/imageGallery";
import Image from "next/image";
import { useUser } from "@/app/utils/context/UserContext";
import { useEffect, useState } from "react";

export default function PaintingPage({ params }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true); // Initialize loading to true
  const [painting, setPainting] = useState(null); // Start with null until data is fetched
  const { addToCart } = useUser();

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const foundPainting = doc(db, "paintings", id);
        const paintingDoc = await getDoc(foundPainting);
        if (paintingDoc.exists()) {
          setPainting({
            id: paintingDoc.id,
            ...paintingDoc.data(),
          });
        } else {
          console.error("No such painting!");
        }
      } catch (error) {
        console.error("Error fetching painting:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPainting();
  }, [id]);

  const getRelatedPaintings = (category) => {
    console.log(category);
    return imageGallery
      .filter((img) => img.category === category && img.id !== id)
      .slice(0, 4);
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!painting) {
    return <p className="text-center">Painting not found.</p>; // Handle case where painting is null
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mb-4 mt-0 lg:mt-2 max-w-screen-xl mx-auto p-4">
        <div className="md:w-3/5 flex justify-center mb-4 md:mb-0">
          <Image
            src={painting.imageUrl}
            alt={painting.name}
            width={500}
            height={500}
            className="shadow-lg rounded-lg"
          />
        </div>

        <div className="md:w-2/5 flex flex-col justify-center md:pl-8 lg:pl-4 xl:pl-0">
          <h1 className="text-4xl font-bold text-gray-800 text-center md:text-start dark:text-gray-200 mb-3">
            {painting.name}
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
            Price: $<span className="font-semibold">{painting.price}</span>
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            Category: <span className="font-semibold">{painting.category}</span>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {painting.description
              ? painting.description
              : "This painting represents a unique blend of emotions and thoughts. It captures the essence of the artist's vision, inviting viewers to explore the depth of creativity and imagination."}
          </p>
          <button
            onClick={() => addToCart(painting)}
            className="mt-4 py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-lg hover:bg-purple-900 transition duration-300 w-full sm:w-3/5 lg:w-2/5"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h1 className="text-center text-3xl my-6">Related Paintings</h1>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:mx-12 px-0 md:px-12 xl:px-20">
        {/* Uncomment and implement related paintings logic here */}
        {/* {relatedPaintings.map((relatedPainting) => (
          <Link key={relatedPainting.id} href={`/gallery/${relatedPainting.id}`}>
            <div className="flex flex-col items-center mb-2 transition-transform transform hover:scale-105">
              <Image
                src={relatedPainting.path}
                alt={relatedPainting.name}
                width={280}
                height={280}
                className="shadow-lg"
              />
              <p className="mt-2 text-center text-lg">{relatedPainting.name}</p>
              <p className="text-center text-sm">${relatedPainting.price.toFixed(2)}</p>
            </div>
          </Link>
        ))} */}
      </div>
    </>
  );
}
