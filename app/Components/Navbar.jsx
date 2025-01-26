"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { app } from "../firebase"; // Ensure this points to your Firebase config file
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { FiMenu, FiX } from "react-icons/fi"; // For burger icon

const theme = createTheme({
  palette: {
    bluey: "#2196F3",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export default function Navbar() {
  const router = useRouter();
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [flag, setFlag] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for burger menu
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setFlag(true);
        setCurrentId(user.uid);
        setCurrentName(user.displayName || user.email.split("@")[0]); // Use display name or email prefix
      } else {
        // User is signed out
        setFlag(false);
        setCurrentName("");
        setCurrentId("");
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [router, pathname]);

  if (pathname === "/login" || pathname === "/signup") {
    return null; // Do not render Navbar on login/signup pages
  }

  const links = [
    { target: "/", label: "Home", active: pathname === "/" },
    { target: "/leaderboard", label: "Leaderboard", active: pathname === "/leaderboard" },
    { target: "/issues", label: "Issues", active: pathname === "/issues" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center gap-[0px] w-full p-[30px] pl-[50px] border-b">
      {/* Logo */}
      <Link href="/">
        <img
          src="./favicon.ico"
          alt="Logo"
          className="h-[40px] relative bottom-[5px] sm:mr-[10px] sm:h-[40px] md:h-[50px]"
        />
      </Link>

      {/* Desktop Navbar Links */}
      <div className="hidden sm:flex items-center gap-[30px] flex-1 ml-[5%]">
        {links.map((link, i) => (
          <a key={i} href={link.target}>
            <div
              className={`font-semibold text-[13.2px] md:text-[18px] cursor-pointer transition-all duration-200 ${
                link.active ? "text-[#4a4a4a]" : "text-[#9e9e9e]"
              }`}
            >
              {link.label}
            </div>
          </a>
        ))}
      </div>

      {/* Mobile Burger Menu */}
      <div className="sm:hidden ml-auto">
        <button onClick={toggleMenu} className="text-[30px]">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="">
          <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center p-[20px]">
    {links.map((link, i) => (
      <a
        href={link.target}
        key={i}
        className={`font-semibold text-[18px] py-2 px-4 ${
          link.active ? "text-blue-500" : "text-gray-700"
        }`}
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        {link.label}
      </a>
    ))}
  </div>
          {!flag && (
            <div className="flex flex-col mt-4 gap-2 w-full">
              <Link href="/login">
                <Button variant="text" size="large" fullWidth>
                  LOG IN
                </Button>
              </Link>
              <Button variant="contained" size="large" fullWidth>
                SIGN UP
              </Button>
            </div>
          )}
          {/* {flag && (
            <div className="flex flex-col items-start mt-4">
              <div className="flex items-center gap-2">
                <button className="flex justify-center items-center bg-blue-500 rounded-full h-[50px] w-[50px] text-white text-[22px]">
                  {currentName.charAt(0).toUpperCase()}
                </button>
                <p className="text-[25px]">{currentName}</p>
              </div>
            </div>
          )} */}
        </div>
      )}

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-[10px] ml-auto mr-[2.5%]">
        {!flag && (
          <Stack direction="row" spacing={2}>
            <Link href="/login">
              <Button variant="text" size="large">
                LOG IN
              </Button>
            </Link>
            <Button variant="contained" size="large">
              SIGN UP
            </Button>
          </Stack>
        )}
        {flag && (
          <div className="flex items-center">
            <button className="flex justify-center items-center bg-blue-500 rounded-full h-[50px] w-[50px] text-white text-[22px] mr-[10px]">
              {currentName.charAt(0).toUpperCase()}
            </button>
            <p className="text-[25px]">{currentName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
