import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg mt-auto shadow py-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl flex flex-col items-center justify-center md:flex-row md:justify-between px-2 sm:px-10 lg:px-14">
            <div className="flex items-center justify-center mb-4 md:mb-0">
            <svg
                    width="38"
                    height="38"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 29.5274L28.6323 4.10484"
                      stroke="#B80000"
                      strokeWidth="8"
                    />
                    <path
                      d="M11 22.5L41.9829 53.0332"
                      stroke="#B80000"
                      strokeWidth="8"
                    />
                    <path
                      d="M31.8198 30.0103L54 43.5"
                      stroke="#B80000"
                      strokeWidth="8"
                    />
                    <path
                      d="M27.0793 19.8251C28.6332 18.2549 31.1658 18.2416 32.7361 19.7955L35.8157 22.843C37.3859 24.3969 37.3992 26.9295 35.8453 28.4998L26.766 37.6747L18 29L27.0793 19.8251Z"
                      stroke="#B80000"
                      strokeWidth="8"
                    />
                    <path
                      d="M4 4H44C48.4183 4 52 7.58172 52 12V52H12C7.58172 52 4 48.4183 4 44V4Z"
                      stroke="#B80000"
                      strokeWidth="8"
                    />
                  </svg>
              <span className="text-lg text-gray-700 ml-2 dark:text-gray-200 font-semibold">
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