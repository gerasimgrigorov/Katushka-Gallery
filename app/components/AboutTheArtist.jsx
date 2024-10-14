import Image from "next/image";

export default function AboutTheArtist() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center my-8 bg-gray-200 my-6 px-12 md:px-16 lg:px-20 py-8">
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
          since childhood, and <strong>surrealism</strong> is my favorite style
          because it lets me explore my
          <strong> imagination</strong>. My art reflects the beauty of dreams
          and reality, inviting others to see the world differently. I find
          inspiration in nature, literature, and music, and I hope to inspire
          others to embrace their{" "}
          <span className="underline decoration-wavy">creativity</span>.
        </p>
      </div>
    </div>
  );
}
