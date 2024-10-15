"use client";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../services/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import styles from "./Page.module.css";

export default function HeroSection() {
  const [squarePaintings, setSquarePaintings] = useState([]);
  const [imageSlots, setImageSlots] = useState([null, null, null, null]);
  const [isVisible, setIsVisible] = useState([true, true, true, true]);

  const timeoutRef = useRef(null);

  // console.log(imageSlots);

  useEffect(() => {
    async function fetchPaintings() {
      const querySnapshot = await getDocs(collection(db, "paintings"));
      const allPaintings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredSquarePaintings = allPaintings.filter(
        (painting) =>
          !painting.width && !painting.height && painting.name !== "Old scars"
      );

      setSquarePaintings(filteredSquarePaintings);

      setImageSlots(shuffleArray(filteredSquarePaintings).slice(0, 4));
    }

    fetchPaintings();
  }, []);

  useEffect(() => {
    function startImageRotation(slotIndex) {
      function updateImage() {
        // Fade out the image
        setIsVisible((prevVisible) => {
          const newVisible = [...prevVisible];
          newVisible[slotIndex] = false; // Set to false to trigger fade-out
          return newVisible;
        });

        // After the fade-out effect (1 second), change the image and fade it back in
        timeoutRef.current = setTimeout(() => {
          setImageSlots((prevSlots) => {
            if (!Array.isArray(prevSlots)) {
              console.error("prevSlots is not an array", prevSlots);
              return [null, null, null, null]; // Return a default value
            }

            const newSlots = [...prevSlots];

            let randomPainting =
              squarePaintings[
                Math.floor(Math.random() * squarePaintings.length)
              ];

            // Avoid duplicate images in the slots
            while (newSlots.includes(randomPainting)) {
              randomPainting =
                squarePaintings[
                  Math.floor(Math.random() * squarePaintings.length)
                ];
            }

            newSlots[slotIndex] = randomPainting; // Assign the random painting to the slot
            return newSlots;
          });

          // Fade the image back in
          setIsVisible((prevVisible) => {
            const newVisible = [...prevVisible];
            newVisible[slotIndex] = true; // Set to true to trigger fade-in
            return newVisible;
          });

          const randomTime =
            Math.floor(Math.random() * (16000 - 8000 + 1)) + 3000;

          // Clear previous timeout
          // clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(updateImage, randomTime);
        }, 1000);
      }

      updateImage();
    }

    if (squarePaintings.length > 0) {
      imageSlots.forEach((_, index) => {
        startImageRotation(index);
      });
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [squarePaintings]);

  // useEffect(() => {
  //   function startImageRotation(slotIndex) {
  //     function updateImage() {
  //       // Fade out the image
  //       setIsVisible((prevVisible) => {
  //         const newVisible = [...prevVisible];
  //         newVisible[slotIndex] = false; // Set to false to trigger fade-out
  //         return newVisible;
  //       });

  //       // After the fade-out effect (1 second), change the image and fade it back in
  //       timeoutRef.current = setTimeout(() => {
  //         setImageSlots((prevSlots) => {
  //           const newSlots = [...prevSlots];

  //           let randomPainting =
  //             squarePaintings[Math.floor(Math.random() * squarePaintings.length)];

  //           // Avoid duplicate images in the slots
  //           while (newSlots.includes(randomPainting)) {
  //             randomPainting = squarePaintings[Math.floor(Math.random() * squarePaintings.length)];
  //           }

  //           // let randomPainting;
  //           // do {
  //           //   randomPainting =
  //           //     squarePaintings[
  //           //       Math.floor(Math.random() * squarePaintings.length)
  //           //     ];
  //           // } while (newSlots.includes(randomPainting));

  //           // newSlots[slotIndex] = randomPainting;
  //           // return newSlots;
  //         });

  //         // Fade the image back in
  //         setIsVisible((prevVisible) => {
  //           const newVisible = [...prevVisible];
  //           newVisible[slotIndex] = true; // Set to true to trigger fade-in
  //           return newVisible;
  //         });

  //         const randomTime =
  //           Math.floor(Math.random() * (16000 - 8000 + 1)) + 3000;

  //         // clearTimeout(timeoutRef.current)
  //         timeoutRef.current = setTimeout(updateImage, randomTime);
  //       }, 1000);
  //     }

  //     updateImage();
  //   }

  //   if (squarePaintings.length > 0) {
  //     imageSlots.forEach((_, index) => {
  //       startImageRotation(index);
  //     });
  //   }

  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, [squarePaintings, imageSlots]);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="relative flex items-center justify-center py-4 lg:py-0 mb-2">
      <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-2 sm:gap-4">
        <div className="flex my-auto flex-col gap-2 sm:gap-4 items-end hidden lg:flex">
          {imageSlots[0] && (
            <div
              className={
                isVisible[0] ? styles["image-fade"] : styles["image-hidden"]
              }
            >
              <Image
                key={imageSlots[0].id}
                src={imageSlots[0].imageUrl}
                alt={imageSlots[0].name}
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
          {imageSlots[1] && (
            <div
              className={
                isVisible[1] ? styles["image-fade"] : styles["image-hidden"]
              }
            >
              <Image
                key={imageSlots[1].id}
                src={imageSlots[1].imageUrl}
                alt={imageSlots[1].name}
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex my-auto flex-col items-center relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kami-gallery.appspot.com/o/paintings%2FInside-out.jpg?alt=media&token=8be16280-7e6f-4a5e-9ce7-b2f2da1afb97"
            alt="Central Painting"
            width={520}
            height={608}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex my-auto flex-col gap-2 sm:gap-4 items-start hidden lg:flex">
          {imageSlots[2] && (
            <div
              className={
                isVisible[2] ? styles["image-fade"] : styles["image-hidden"]
              }
            >
              <Image
                key={imageSlots[2].id}
                src={imageSlots[2].imageUrl}
                alt={imageSlots[2].name}
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
          {imageSlots[3] && (
            <div
              className={
                isVisible[3] ? styles["image-fade"] : styles["image-hidden"]
              }
            >
              <Image
                key={imageSlots[3].id}
                src={imageSlots[3].imageUrl}
                alt={imageSlots[3].name}
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 rounded-lg">
          <p className="text-black text-center mb-1">
            "In a world where dreams and reality intertwine, we venture beyond
            the ordinary,
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
    </div>
  );
}
