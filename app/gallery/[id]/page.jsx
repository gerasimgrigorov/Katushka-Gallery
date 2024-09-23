"use client";

import Link from "next/link";
import { imageGallery } from "@/app/utils/imageGallery";
import Image from "next/image";

export default function PaintingPage({ params }) {
  const { id } = params;

  const painting = imageGallery.find((img) => img.id === id);
  
  const getRelatedPaintings = (category) => {
    return imageGallery
      .filter((img) => img.category === category && img.id !== id)
      .slice(0, 4); 
  };

  const relatedPaintings = getRelatedPaintings(painting.category);

  if (!painting) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row my-4 max-w-screen-xl mx-auto p-4">
        <div className="md:w-3/5 flex justify-center mb-4 md:mb-0">
          <Image
            src={painting.path}
            alt={painting.name}
            width={painting.width * 0.55}
            height={painting.height * 0.55} 
            className="shadow-lg rounded-lg"
          />
        </div>

        <div className="md:w-2/5 flex flex-col justify-center md:pl-8 lg:pl-0">
          <h1 className="text-4xl font-bold text-gray-800 text-center md:text-start dark:text-gray-200 mb-3">
            {painting.name}
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
            Price: <span className="font-semibold">{painting.price}</span>
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            Category: <span className="font-semibold">{painting.category}</span>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            This painting represents a unique blend of emotions and thoughts. It captures the essence of the artist's vision, inviting viewers to explore the depth of creativity and imagination.
          </p>
        </div>
      </div>

      <h1 className="text-center text-3xl my-6">Related Paintings</h1>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 gap-4 2xl:mx-12 sm:px-4 xl:px-14 ">
        {relatedPaintings.map((relatedPainting) => (
          <Link key={relatedPainting.id} href={`/gallery/${relatedPainting.id}`}>
            <div className="flex flex-col items-center mb-2">
              <Image
                src={relatedPainting.path}
                alt={relatedPainting.name}
                width={280}
                height={280}
                className="shadow-lg"
              />
              <p className="mt-2 text-center text-lg">{relatedPainting.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
