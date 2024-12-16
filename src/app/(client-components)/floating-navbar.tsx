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
      className={`fixed top-2 inset-x-0 z-50 flex items-center justify-between px-4 py-2 w-full max-w-full sm:max-w-xl mx-auto transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-lg"
          : "bg-white bg-opacity-100"
      } rounded-lg sm:rounded-full`}
    >
      {/* Navbar start */}
      <div className="flex items-center">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white rounded-lg z-[1] mt-2 w-40 p-2 shadow-md"
          >
            {navItems.map((navItem, idx) => (
              <li key={`dropdown-link-${idx}`}>
                <Link
                  href={navItem.link as Route<string>}
                  className="hover:bg-gray-100 rounded-md p-2"
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1733722950/logoblack_rdtpxs.png"
          width={60}
          height={60}
          alt="Niddia Logo"
          className="pl-2"
        />
      </div>

      {/* Navbar center */}
      <div className="hidden lg:flex">
        <ul className="flex space-x-4">
          {navItems.map((navItem, idx) => (
            <li key={`nav-link-${idx}`}>
              <Link
                href={navItem.link as Route<string>}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat with Niddia button */}
      <motion.div
        className="navbar-end"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={"/niddia" as Route<string>}
          className="px-4 py-2 text-white bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
        >
          Chatea con Niddia
        </Link>
      </motion.div>
    </div>
  );
};
