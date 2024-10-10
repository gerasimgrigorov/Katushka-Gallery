"use client";

import Link from "next/link";
import { db } from "../../services/firebaseConfig";
import { getDoc, doc, getDocs, collection, query, where, limit } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/app/utils/context/UserContext";
import { useEffect, useState } from "react";

export default function PaintingPage({ params }) {
  const { showAlert } = useUser();
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [painting, setPainting] = useState(null);
  const [relatedPaintings, setRelatedPaintings] = useState([]);
  const { addToCart } = useUser();

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const foundPainting = doc(db, "paintings", id);
        const paintingDoc = await getDoc(foundPainting);
        if (paintingDoc.exists()) {
          const paintingData = {
            id: paintingDoc.id,
            ...paintingDoc.data(),
          };
          setPainting(paintingData);
          await fetchRelatedPaintings(paintingData.category, paintingData.id);
        } else {
          console.error("No such painting!");
        }
      } catch (error) {
        console.error("Error fetching painting:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedPaintings = async (category, currentPaintingId) => {
      try {
        const relatedQuery = query(
          collection(db, "paintings"),
          where("category", "==", category),
          limit(4)
        );
        const querySnapshot = await getDocs(relatedQuery);
        const relatedResults = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((painting) => painting.id !== currentPaintingId); 

        if (relatedResults.length < 4) {
          const additionalNeeded = 4 - relatedResults.length;

          const fallbackQuery = query(
            collection(db, "paintings"),
            limit(additionalNeeded) 
          );
          const fallbackSnapshot = await getDocs(fallbackQuery);
          const fallbackResults = fallbackSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((painting) => 
              painting.id !== currentPaintingId && 
              !relatedResults.some(rp => rp.id === painting.id) 
            );

          const combinedResults = [...relatedResults, ...fallbackResults].slice(0, 4);
          setRelatedPaintings(combinedResults);
        } else {
          setRelatedPaintings(relatedResults);
        }
      } catch (error) {
        console.error("Error fetching related paintings:", error);
      }
    };

    fetchPainting();
  }, [id]);

  console.log(relatedPaintings);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!painting) {
    showAlert("This painting does not exist.");
    router.push("/");
    return;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mb-4 mt-0 lg:mt-2 max-w-screen-xl mx-auto p-4">
        <div className="md:w-3/5 flex justify-center mb-4 md:mb-0">
          <Image
            src={painting.imageUrl}
            alt={painting.name}
            width={painting.width ? painting.width * 0.47 : 550}
            height={painting.height ? painting.height * 0.47 : 550}
            className="shadow-lg rounded-lg"
            priority={true}
          />
        </div>

        <div className="md:w-2/5 flex flex-col justify-center md:pl-8 lg:pl-4 xl:pl-0">
          {(painting.status === "Sold" || painting.status === "Ordered") && (
            <p className="text-white px-3 text-lg mb-2 ml-auto md:ml-0 mr-auto rounded-md bg-red-500">
              {painting.status}
            </p>
          )}
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
            disabled={painting.status === "Sold" || painting.status === "Ordered"}
            onClick={() => addToCart(painting)}
            className="mt-4 py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-lg hover:bg-purple-900 disabled:bg-gray-500 transition duration-300 w-full sm:w-3/5 lg:w-2/5"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Paintings Section */}
      <h1 className="text-center text-3xl my-6">Related Paintings</h1>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:mx-12 px-0 md:px-12 xl:px-20">
        {relatedPaintings.map((relatedPainting) => (
          <Link key={relatedPainting.id} href={`/gallery/${relatedPainting.id}`}>
            <div className="flex flex-col items-center mb-2 transition-transform transform hover:scale-105">
              <Image
                src={relatedPainting.imageUrl}
                alt={relatedPainting.name}
                width={280}
                height={280}
                className="shadow-lg"
              />
              <p className="mt-2 text-center text-lg">{relatedPainting.name}</p>
              <p className="text-center text-sm">${relatedPainting.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
