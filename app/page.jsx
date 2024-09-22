import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-gray-100 lg:min-h-screen flex items-center justify-center">
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
              <div className="absolute max-h-32 my-auto inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 rounded-lg m-2">
                <p className="text-black text-center mb-1">
                  "In a world where dreams and reality intertwine, we venture beyond the ordinary, embracing the beauty of the unknown."
                </p>
                <button className="px-4 py-2 m-1 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-500 duration-300">
                  View All
                </button>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
