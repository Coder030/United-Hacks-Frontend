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
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setFlag(true);
        setCurrentId(user.uid);
        console.log(user)
        setCurrentName(user.displayName || user.email.split("@")[0]); // Use display name or email prefix
      } else {
        // User is signed out
        setFlag(false);
        setCurrentName("");
        setCurrentId("");
        if (pathname !== "/login" && pathname !== "/signup") {
          router.push("/login"); // Redirect to login if not already there
        }
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
    { target: "/page2", label: "Page 2", active: pathname === "/page2" },
    { target: "/page3", label: "Page 3", active: pathname === "/page3" },
    { target: "/page4", label: "Page 4", active: pathname === "/page4" },
  ];

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
                       <button
  className="flex justify-center items-center bg-blue-500 rounded-full h-[50px] w-[50px] text-white text-[22px] mr-[10px]"
>{currentName.charAt(0).toUpperCase()}
</button>
            <p className="text-[25px]">{currentName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
