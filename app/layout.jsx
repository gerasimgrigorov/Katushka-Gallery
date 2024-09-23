import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import "./globals.css";

export const metadata = {
  title: "Katushka n Da Rats",
  description: "Art Gallery",
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Gallery", href: "/gallery", current: false },
  { name: "Contact", href: "/contact", current: false },
  // { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Logo.png" sizes="any" />
      </head>
      <body>
        <div className="my-1 sticky top-0 z-50">
          <Disclosure as="nav" className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-10 lg:px-14">
              <div className="normal-font-styling relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block h-6 w-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href={"/"}>
                    <div className="flex flex-shrink-0 items-center ">
                      <svg
                        width="52"
                        height="52"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </div>
                  </Link>
                  <div className="hidden sm:ml-4 sm:block my-auto">
                    <div className="flex space-x-3">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-600 text-white"
                              : "text-black hover:bg-gray-600 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium duration-300"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="pr-2">
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <IoCartOutline aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <div>
                    <a
                      href={"#"}
                      // aria-current={item.current ? "page" : undefined}
                      className={
                        "text-black border border-current hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium duration-300"
                      }
                    >
                      Login
                    </a>
                  </div>

                  <div className="pl-2 hidden md:block">
                    <a
                      href={"#"}
                      // aria-current={item.current ? "page" : undefined}
                      className={
                        "text-white bg-gray-600 hover:bg-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-3 py-2 text-sm font-medium duration-300"
                      }
                    >
                      Register
                    </a>
                  </div>

                  {/* Profile dropdown */}
                  {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu> */}
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 normal-font-styling">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
        {children}

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
      </body>
    </html>
  );
}
