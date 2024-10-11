"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "./services/firebaseConfig";
import { getRandomPaintings } from "./utils/getRandomPaintings";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import HeroSection from "./components/HeroSection";

export default function Page() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    async function getPaintings() {
      const querySnapshot = await getDocs(collection(db, "paintings"));
      const paintingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPaintings(getRandomPaintings(paintingsData, 8));
    }

    getPaintings();
  }, []);

  return (
    <div className="my-1 items-center justify-center">
      <div className="container mx-auto px-2 sm:px-10 lg:px-14">
        <HeroSection />

        {/* <div className="relative flex items-center justify-center py-6 lg:py-0">
          <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-2 sm:gap-4">
            <div className="flex my-auto flex-col gap-2 sm:gap-4 items-end hidden lg:flex">
              {surroundingPaintings.slice(0, 2).map((painting) => (
                <div className={`${styles.fade} ${styles.fadeIn}`} key={painting.id}>
                  <Image
                    src={painting.imageUrl}
                    alt={painting.name}
                    width={280}
                    height={280}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>

            <div className="flex my-auto flex-col items-center relative">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kami-gallery.appspot.com/o/paintings%2FInside-out.jpg?alt=media&token=8be16280-7e6f-4a5e-9ce7-b2f2da1afb97"
                alt="Central Painting"
                width={540}
                height={648}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="flex my-auto flex-col gap-2 sm:gap-4 items-start hidden lg:flex">
              {surroundingPaintings.slice(2, 4).map((painting) => (
                <div className={`${styles.fade} ${styles.fadeIn}`} key={painting.id}>
                  <Image
                    src={painting.imageUrl}
                    alt={painting.name}
                    width={280}
                    height={280}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 rounded-lg">
              <p className="text-black text-center mb-1">
                "In a world where dreams and reality intertwine, we venture
                beyond the ordinary,
                <br /> embracing the beauty of the unknown."
              </p>
              <Link
                href="/gallery"
                className="px-6 py-3 m-1 bg-red-800 text-white rounded-full shadow-md hover:bg-red-600 duration-300"
              >
                Explore gallery
              </Link>
            </div>
          </div>
        </div> */}

        <h1 className="text-center text-3xl my-6">Featured</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 gap-6 lg:gap-4 2xl:gap-0 2xl:mx-12 sm:px-0 xl:px-14 ">
          {paintings.map((painting) => (
            <Link key={painting.id} href={`/gallery/${painting.id}`}>
              <div className="flex flex-col items-center mb-2 px-4 py-2 transition-transform transform hover:scale-105 cursor-pointer">
                <Image
                  src={painting.imageUrl}
                  alt={painting.name}
                  width={260}
                  height={260}
                  className="shadow-lg"
                />
                <p className="mt-2 text-center text-lg">{painting.name}</p>{" "}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center bg-gray-200 my-6 px-12 md:px-16 lg:px-20 py-8">
        <div className="flex justify-center lg:w-1/3">
          <Image
            src="/images/Artist.jpg"
            alt="Katushka"
            width={220}
            height={220}
            className="rounded-full border-4 border-gray-300 shadow-lg"
          />
        </div>
        <div className="flex-1 p-0 lg:py-4 lg:ps-0 lg:pe-20 pb-10 lg:pb-0">
          <h2 className="text-xl font-semibold mb-2">Artist Biography</h2>
          <p>
            I’m Kami, born on August 19, 2004, in Bulgaria. I’ve loved drawing
            since childhood, and <strong>surrealism</strong> is my favorite
            style because it lets me explore my
            <strong> imagination</strong>. My art reflects the beauty of dreams
            and reality, inviting others to see the world differently. I find
            inspiration in nature, literature, and music, and I hope to inspire
            others to embrace their{" "}
            <span className="underline decoration-wavy">creativity</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
