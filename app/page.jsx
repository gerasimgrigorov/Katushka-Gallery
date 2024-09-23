import Image from "next/image";

const imageGallery = [
  {
    id: "1a2b3c",
    path: "/images/Cannot-redo-what-is-already-done.jpg",
    name: "Cannot redo what is already done",
    width: 1080,
    height: 1080,
  },
  {
    id: "4d5e6f",
    path: "/images/Doodies.jpg",
    name: "Doodies",
    width: 1080,
    height: 1080,
  },
  {
    id: "7g8h9i",
    path: "/images/Fell-the-pain.jpg",
    name: "Fell the pain",
    width: 1080,
    height: 1080,
  },
  {
    id: "10j11k",
    path: "/images/Funk-and-vampires.jpg",
    name: "Funk and vampires",
    width: 1080,
    height: 1080,
  },
  {
    id: "12l13m",
    path: "/images/Inside-out.jpg",
    name: "Inside out",
    width: 1080,
    height: 1350,
  },
  {
    id: "14n15o",
    path: "/images/Lost-in-the-dark.jpg",
    name: "Lost in the dark",
    width: 1080,
    height: 1296,
  },
  {
    id: "16p17q",
    path: "/images/Magic-archer.jpg",
    name: "Magic archer",
    width: 1080,
    height: 1080,
  },
  {
    id: "18r19s",
    path: "/images/Movie-night.jpg",
    name: "Movie night",
    width: 1080,
    height: 1080,
  },
  {
    id: "20t21u",
    path: "/images/Old-scars.jpg",
    name: "Old scars",
    width: 1080,
    height: 1080,
  },
  {
    id: "22v23w",
    path: "/images/Pewpew-noises-in-the-background.jpg",
    name: "Pewpew noises in the background",
    width: 1080,
    height: 1080,
  },
  {
    id: "24x25y",
    path: "/images/Protected-by-the-sins.jpg",
    name: "Protected by the sins",
    width: 1080,
    height: 1080,
  },
  {
    id: "26z27a",
    path: "/images/Red-room.jpg",
    name: "Red room",
    width: 1080,
    height: 1080,
  },
  {
    id: "28b29c",
    path: "/images/The-coffin-of Andy-and-Leyley.jpg",
    name: "The coffin of Andy and Leyley",
    width: 1080,
    height: 1080,
  },
  {
    id: "30d31e",
    path: "/images/The-separation-two-of-the-same.jpg",
    name: "The separation: two of the same",
    width: 1080,
    height: 1296,
  },
  {
    id: "32f33g",
    path: "/images/Walk-in-the-park.jpg",
    name: "Walk in the park",
    width: 1080,
    height: 1080,
  },
];

function getRandomPaintings(imageGallery, num) {
  const shuffled = [...imageGallery].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export default function Page() {
  const featuredPaintings = getRandomPaintings(imageGallery, 4);

  return (
    <div className="my-1 items-center justify-center">
      {/* Container with padding */}
      <div className="container mx-auto px-2 sm:px-10 lg:px-14">
        {/* Hero Section */}
        <div className="relative flex items-center justify-center py-6 lg:py-0">
          {/* Image Grid */}
          <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-2 sm:gap-4">
            {/* Left smaller images (stacked vertically) */}
            <div className="flex my-auto flex-col gap-2 sm:gap-4 items-end hidden lg:flex">
              <Image
                src="/images/Old-scars.jpg"
                alt="Painting 1"
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/images/Magic-archer.jpg"
                alt="Painting 2"
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Central large image */}
            <div className="flex my-auto flex-col items-center relative">
              <Image
                src="/images/Inside-out.jpg"
                alt="Central Painting"
                width={540}
                height={648}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Right smaller images (stacked vertically) */}
            <div className="flex my-auto flex-col gap-2 sm:gap-4 items-start hidden lg:flex">
              <Image
                src="/images/Movie-night.jpg"
                alt="Painting 3"
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/images/Doodies.jpg"
                alt="Painting 4"
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 rounded-lg">
              <p className="text-black text-center mb-1">
                "In a world where dreams and reality intertwine, we venture
                beyond the ordinary,
                <br /> embracing the beauty of the unknown."
              </p>
              <button className="px-6 py-3 m-1 bg-red-800 text-white rounded-full shadow-md hover:bg-red-600 duration-300">
                View All
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-center text-3xl my-6">Featured</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 gap-4 lg:gap-4 2xl:gap-0 2xl:mx-12 sm:px-10 lg:px-14">
          {featuredPaintings.map((painting) => (
            <div key={painting.id} className="flex flex-col items-center mb-2">
              <Image
                src={painting.path}
                alt={painting.name}
                width={260} // Set a smaller width
                height={260} // Set a smaller height
                className="shadow-lg"
              />
              <p className="mt-2 text-center text-lg">{painting.name}</p>{" "}
              {/* Display name under the painting */}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center bg-gray-200 my-12 px-12 md:px-16 lg:px-20 py-8">
        <div className="flex justify-center lg:w-1/3">
          <Image
            src="/images/Artist.jpg" // Replace with actual path
            alt="Katushka"
            width={220} // Adjust size as needed
            height={220} // Adjust size as needed
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
