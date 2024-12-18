"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/routers/types";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-5 inset-x-0 z-50 flex items-center justify-between p-3 w-full max-w-screen-lg mx-auto transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-lg"
          : "bg-white bg-opacity-100"
      } rounded-full`}
    >
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between w-full relative">
        {/* Hamburger Icon */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Centered Logo */}
        <div className="flex-grow flex justify-center">
          <Image
            src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1733722950/logoblack_rdtpxs.png"
            width={50}
            height={50}
            alt="Niddia Logo"
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <ul className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-2 z-50 p-2">
            {navItems.map((navItem, idx) => (
              <li key={`dropdown-link-${idx}`}>
                <Link
                  href={navItem.link as Route<string>}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Chat Button */}
        <motion.div
          className="flex justify-end"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={"/niddia" as Route<string>}
            className="px-4 py-2 text-white bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Chat
          </Link>
        </motion.div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1733722950/logoblack_rdtpxs.png"
            width={100}
            height={100}
            alt="Niddia Logo"
            className="pl-5"
          />
        </div>

        <ul className="flex space-x-6">
          {navItems.map((navItem, idx) => (
            <li key={`nav-link-${idx}`}>
              <Link
                href={navItem.link as Route<string>}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>

        <motion.div
          className="navbar-end"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={"/niddia" as Route<string>}
            className="px-6 py-2 text-white bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Chatea con Niddia
          </Link>
        </motion.div>
      </div>
    </div>
  );
};