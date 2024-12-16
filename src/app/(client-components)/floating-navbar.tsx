"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

import { usePathname } from "next/navigation";

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

  {/*if (pathname === "/niddia" || pathname === "/niddiaDesarrollos") {
    return null;
  */}

  return (
    <div
      className={`navbar fixed top-10 inset-x-0 z-50 flex flex-wrap items-center justify-between p-5 w-full lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-lg"
          : "bg-white bg-opacity-100"
      }`}
      style={{
        borderRadius: "200px",
        fontFamily: "",
      }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((navItem, idx) => (
              <li key={`dropdown-link-${idx}`}>
                <Link href={navItem.link}>{navItem.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={"https://res.cloudinary.com/dwrtldhxd/image/upload/v1733722950/logoblack_rdtpxs.png"}
          width={100}
          height={100}
          alt="Niddia Impulsada por inteligencia aritifical"
          className="pl-5"
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((navItem, idx) => (
            <li key={`nav-link-${idx}`}>
              <Link href={navItem.link}>{navItem.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};
