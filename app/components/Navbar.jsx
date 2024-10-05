"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { useUser } from "../utils/context/UserContext";
import { logout } from "../services/authFunctions";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Gallery", href: "/gallery", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { currentUser, cart } = useUser();

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.log("Logout failed: ", e);
    }
  }

  return (
    <div className="my-1 sticky top-0 z-50">
      <Disclosure as="nav" className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-10 lg:px-14">
          <div className="normal-font-styling relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
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

            {/* Logo and navigation links */}
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
                </div>
              </Link>

              {/* Main navigation */}
              <div className="hidden sm:ml-4 sm:block my-auto">
                <div className="flex space-x-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-600 text-white"
                          : "text-black hover:bg-gray-600 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium duration-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative pr-3">
                <Link href={"/admin"}>
                  <RiAdminLine aria-hidden="true" className="h-6 w-6" />
                </Link>
              </div>

              <div className="relative pr-3">
                <Link href={"/cart"}>
                  <IoCartOutline aria-hidden="true" className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute bottom-3 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>

              {currentUser ? (
                <>
                  <div>
                    <Link
                      href={"/profile"}
                      className="text-black border border-current hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium duration-300"
                    >
                      Profile
                    </Link>
                  </div>

                  <div className="pl-2 hidden md:block">
                    <button
                      onClick={handleLogout}
                      className="text-white bg-gray-600 hover:bg-gray-800 rounded-md px-3 py-2 text-sm font-medium duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link
                      href={"/login"}
                      className="text-black border border-current hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium duration-300"
                    >
                      Login
                    </Link>
                  </div>

                  <div className="pl-2 hidden md:block">
                    <Link
                      href={"/register"}
                      className="text-white bg-gray-600 hover:bg-gray-800 rounded-md px-3 py-2 text-sm font-medium duration-300"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
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
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-black hover:bg-gray-700 hover:text-white",
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
  );
}
