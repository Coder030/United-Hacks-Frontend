"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoverIndicator, setHoverIndicator] = useState(false);
  const [hoverIndicatorPosition, setHoverIndicatorPosition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { target: "/", label: "/page1", active: pathname === "/" },
    { target: "/page2", label: "/page2", active: pathname === "/page2" },
    { target: "/page3", label: "/page3", active: pathname === "/page3" },
    {
      target: "/page4",
      label: "/page4",
      active: pathname === "/page4",
    }
  ];

  return (
    <div className="flex items-center gap-[0px] w-full p-[30px] pl-[100px] border-b">

      {/* Logo */}
      <Link href="/">
        <img
          src="/logo.ico"
          alt="Logo"
          className="h-[40px] relative bottom-[5px] sm:mr-[10px] sm:h-[40px] md:h-[50px]"
        />
      </Link>

      {/* Desktop Navbar Links */}
      <div className="flex items-center gap-[30px] flex-1 ml-[100px]">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.target}
            onMouseEnter={() => {
              setHoverIndicator(true);
              setHoverIndicatorPosition(i);
            }}
            onMouseLeave={() => {
              setHoverIndicator(false);
              setHoverIndicatorPosition(0);
            }}
          >
            <div
              className={`font-semibold text-[18px] cursor-pointer transition-all duration-200 ${
                link.active ||
                (hoverIndicator && hoverIndicatorPosition === i)
                  ? "text-[#4a4a4a]" // Active color
                  : "text-[#9e9e9e]"
              }`}
            >
              {link.label}
            </div>

            <div
              className={`transform transition-all duration-400 h-[8px] relative top-[-6px] w-[calc(100%+10px)] ml-[-5px] origin-bottom ${
                (hoverIndicator && hoverIndicatorPosition === i) ||
                (!hoverIndicator && link.active)
                  ? "bg-[#008AE3] opacity-[20%] top-[-11px] transform scale-y-100"
                  : "bg-transparent transform scale-y-0"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-[10px] ml-auto mr-[100px]">
        <button className="bg-blue-500 font-semibold text-[18px] cursor-pointer transition-all duration-200 px-4 py-2 rounded text-[#fff] hover:bg-blue-600 hover:shadow-lg">
          Sign Up
        </button>
        <button className="bg-blue-500 font-semibold text-[18px] cursor-pointer transition-all duration-200 px-4 py-2 rounded text-[#fff] hover:bg-blue-600 hover:shadow-lg">
          Sign In
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center justify-between w-full">
        <button
          className="text-[#4a4a4a] text-2xl absolute right-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div>
          <div
            className={`fixed flex flex-col justify-center items-center z-10 top-0 right-0 h-full w-[50%] bg-white text-black transition-transform duration-300 transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute right-7 top-4 p-3"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              X{" "}
            </button>
            {links.map((link, i) => (
              <a
                key={i}
                href={link.target}
                onMouseEnter={() => {
                  setHoverIndicator(true);
                  setHoverIndicatorPosition(i);
                }}
                onMouseLeave={() => {
                  setHoverIndicator(false);
                  setHoverIndicatorPosition(0);
                }}
              >
                <div
                  className={`font-semibold text-[25px] cursor-pointer transition-all duration-200 ${
                    link.active ||
                    (hoverIndicator && hoverIndicatorPosition === i)
                      ? "text-[#4a4a4a]" // Active color
                      : "text-[#9e9e9e]"
                  }`}
                >
                  {link.label}
                </div>

                <div
                  className={`transform transition-all duration-400 h-[8px] relative top-[-6px] w-[calc(100%+10px)] ml-[-5px] origin-bottom ${
                    (hoverIndicator && hoverIndicatorPosition === i) ||
                    (!hoverIndicator && link.active)
                      ? "bg-[#008AE3] opacity-[20%] top-[-15px] transform scale-y-100"
                      : "bg-transparent transform scale-y-0"
                  }`}
                />
              </a>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-[10px] hover:bg-blue-600 hover:shadow-lg">
              Sign Up
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-[10px] hover:bg-blue-600 hover:shadow-lg">
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}