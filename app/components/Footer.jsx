import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg mt-auto shadow py-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl flex flex-col items-center justify-center md:flex-row md:justify-between px-2 sm:px-10 lg:px-14">
            <div className="flex items-center justify-center mb-4 md:mb-0">
              <svg
                width="40"
                height="40"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M3 29.5274L28.6323 4.10484"
                  stroke="#B80000"
                  strokeWidth="7"
                />
                <path
                  d="M10.5 22.5L41.9829 53.0332"
                  stroke="#B80000"
                  strokeWidth="7"
                />
                <path
                  d="M31.8198 30.0103L54 43.5"
                  stroke="#B80000"
                  strokeWidth="7"
                />
                <path
                  d="M27.0793 19.8251C28.6332 18.2549 31.1658 18.2416 32.7361 19.7955L35.8157 22.843C37.3859 24.3969 37.3992 26.9295 35.8453 28.4998L26.766 37.6747L18 29L27.0793 19.8251Z"
                  stroke="#B80000"
                  strokeWidth="7"
                />
                <path
                  d="M10 3.5H46C49.5899 3.5 52.5 6.41015 52.5 10V46C52.5 49.5899 49.5899 52.5 46 52.5H10C6.41015 52.5 3.5 49.5899 3.5 46V10C3.5 6.41015 6.41015 3.5 10 3.5Z"
                  stroke="#B80000"
                  strokeWidth="7"
                />
              </svg>

              <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">
                Katushka n Da Rats
              </span>
            </div>

            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.instagram.com/_katushka_00_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:text-red-600 hover:border-red-600 transition duration-300"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://www.facebook.com/kam.rumenowa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:text-blue-600 hover:border-blue-600 transition duration-300"
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="https://x.com/katushkart442"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:text-black hover:border-black transition duration-300"
              >
                <FaXTwitter size={22} />
              </a>
            </div>
          </div>

          <div className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 mt-4 normal-font-styling">
            © 2024 Designed by Gerasim. All Rights Reserved.
          </div>
        </footer>
  );
}