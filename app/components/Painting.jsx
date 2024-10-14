import Image from "next/image";
import Link from "next/link";

export default function Painting({ painting }) {
  return (
    <Link href={`/gallery/${painting.id}`}>
      <div className="relative flex flex-col painting-size items-center mb-2 transition-transform transform hover:scale-105">
        <Image
          src={painting.imageUrl}
          alt={painting.name}
          width={260}
          height={260}
          className="shadow-lg"
        />
        <p className="mt-2 text-center text-lg">{painting.name}</p>
        <p className="text-center text-sm">${painting.price.toFixed(2)}</p>
        {(painting.status === "Sold" || painting.status === "Ordered") && (
          <div className="absolute top-2 left-8 text-white px-2 rounded-md bg-red-500">
            {painting.status}
          </div>
        )}
      </div>
    </Link>
  );
}
