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
      className={`fixed top-10 inset-x-0 z-50 flex items-center justify-between p-5 w-full lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-lg"
          : "bg-white bg-opacity-100"
      } rounded-full`}
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
              className="h-5 w-5"
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
            className="menu dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            {navItems.map((navItem, idx) => (
              <li key={`dropdown-link-${idx}`}>
                <Link
                  href={navItem.link}
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
          width={100}
          height={100}
          alt="Niddia Logo"
          className="pl-5"
        />
      </div>

      {/* Navbar center */}
      <div className="hidden lg:flex">
        <ul className="flex space-x-6">
          {navItems.map((navItem, idx) => (
            <li key={`nav-link-${idx}`}>
              <Link
                href={navItem.link as string}
                className="text-gray-700 hover:text-gray-900 transition-colors"
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
       <Link href={"/" as Route<string>}
          className="px-6 py-2 text-white bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Chatea con Niddia
        </Link>
      </motion.div>
    </div>
  );
};
