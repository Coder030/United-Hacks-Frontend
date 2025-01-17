"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { purple } from "@mui/material/colors"
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    bluey: '#2196F3',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));



export default function Navbar() {
   const router = useRouter()
    const [currentName, setCurrentName] = useState('')
    const [currentId, setCurrentId] = useState('')
    const [flag, setFlag] = useState(false)
    useEffect(() => {
      const fetchData = async () => {
        const response2 = await fetch('http://localhost:2000/api/me/', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
        const data3 = await response2.json()
        console.log(data3)
        if (data3['message'] === 'nvt') {
          router.push('/login')
          setFlag(false);
        }
        else{
          setFlag(true)
          setCurrentId(data3['data']['id'])
          setCurrentName(data3['data']['username'])
        }
      }
      fetchData()
    })
    // useEffect(() => {

    // })
  const pathname = usePathname();
  const [hoverIndicator, setHoverIndicator] = useState(false);
  const [hoverIndicatorPosition, setHoverIndicatorPosition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/login" || pathname === "/signup") {
    return null; // Do not render the Navbar for these paths
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
          src="/logo.ico"
          alt="Logo"
          className="h-[40px] relative bottom-[5px] sm:mr-[20px] sm:h-[40px] md:h-[50px]"
        />
      </Link>

      {/* Desktop Navbar Links */}
      <div className="hidden sm:flex items-center gap-[30px] flex-1 ml-[5%]">
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
  className={`font-semibold text-[13.2px] md:text-[18px] cursor-pointer transition-all duration-200 ${
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

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-[10px] ml-auto mr-[2.5%]">
        {/* <button className="font-semibold text-[18px] cursor-pointer transition-all duration-200 px-4 py-2 rounded text-blue-500 hover:bg-[#f2f8ff] hover:shadow-lg">
        LOG IN
        </button>
        <button className="bg-blue-500 font-semibold text-[18px] cursor-pointer transition-all duration-200 px-4 py-2 rounded text-[#fff] hover:bg-blue-600 hover:shadow-lg">
        SIGN UP
        </button> */}
        {!flag &&
        <Stack direction="row" spacing={2}>
        <Link href="/login"><Button variant="text" size="large">LOG IN</Button></Link>
        <Button variant="contained" size="large">SIGN UP</Button>
      </Stack>}
        {flag && 
        <div className="flex items-center">
        <button className="flex justify-center items-center text-[25px] mr-[10px] bg-blue-500 py-[10px] px-[10px] rounded-[100%] h-[50px] w-[50px] text-white">
          {currentName.charAt(0)}
        </button>
        <p className="text-[25px]">{currentName}</p>
      </div>
        }
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
        <div className="fixed top-0 right-0 bg-white z-10 flex flex-col items-center justify-center w-[50%] h-full">

          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            X
          </button>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.target}
              className="my-2 text-xl"
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
        <Stack direction="column" spacing={2}>
        <Button variant="text" size="large"><Link href="/login">LOG IN</Link></Button>
        <Button variant="contained" size="large">SIGN UP</Button>
        </Stack>  
        </div>
      )}
    </div>
  );
}