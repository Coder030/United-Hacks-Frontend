'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import img from "../../public/auth.ico"
import Image from 'next/image';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';


function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(false);
  const [load, setLoad] = useState(false);
  const [inc, setInc] = useState(false);
  const [nf, setNF] = useState(false);
  // const [suc, setSuc] = useState(false);
  const router = useRouter();

  function handleChange(event) {
    setUsername(event.target.value);
  }
  function handleChange2(event) {
    setPass(event.target.value);
  }

  async function fetchCookie(e) {
    e.preventDefault()
    try {
      if (username !== '' && pass !== '') {
        setInc(false);
        setLoad(true);
        const response = await fetch('http://localhost:2000/make_cookie', {
          method: 'POST',
          body: JSON.stringify({ name: username, password: pass }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        setLoad(false);
        if (json.message === 'same') {
          setFlag(false);
          setNF(true);
        } else {
          setFlag(true);
          setTimeout(() => router.push('/'), 1000);
        }
      } else {
        setInc(true);
      }
    } catch (error) {
      console.error('Error fetching cookie:', error);
      setMessage('Error fetching cookie');
    }
  }
  const handleClose = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setFlag(false);
  };
  const handleClose2 = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setInc(false);
  };
  const handleClose3 = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setNF(false);
  };
  return (
    // <div className="relative mx-auto mr-[312px]">
    //   <h1 className="text-center font-inter font-light mb-16 text-lg">
    //     This is the log in page. This page is for you if you have already registered
    //   </h1>
    //   <div className="mx-auto mb-10 p-12 pb-24 w-[350px] h-[318px] shadow-custom rounded-lg text-center">
    //     <label htmlFor="username" className="text-[20px] text-black font-medium">
    //       <p className="text-center mb-5 font-inter font-light">Username:</p>
    //     </label>
    //     <input
    //       value={username}
    //       type="text"
    //       name="username"
    //       autoComplete="off"
    //       className="w-[250px] h-[30px] border border-black rounded-sm outline-none text-black text-[20px] mb-4"
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="pass" className="text-[20px] text-black font-medium">
    //       <p className="text-center mb-5 font-inter font-light">Password:</p>
    //     </label>
    //     <div className="relative flex items-center justify-center w-[250px] mx-auto">
    //       <input
    //         value={pass}
    //         type={showPassword ? 'text' : 'password'}
    //         name="pass"
    //         autoComplete="off"
    //         className="w-[250px] h-[30px] border border-black rounded-sm outline-none text-black text-[20px]"
    //         onChange={handleChange2}
    //       />
    //       <button
    //         className="absolute right-1 text-gray-500"
    //         onClick={() => setShowPassword(!showPassword)}
    //       >
    //         {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
    //       </button>
    //     </div>
    //     <button
    //       onClick={fetchCookie}
    //       className="block bg-black text-white rounded-lg h-10 w-24 mt-4 mx-auto hover:bg-purple-600"
    //     >
    //       Submit
    //     </button>
    //   </div>
    //   <p className="text-center text-black font-inter font-medium mt-12">New here?</p>
    //   <a href="/sign" className="block text-center underline font-inter font-medium text-black">
    //     Click here to sign up
    //   </a>
    // </div>
    <div className='bg-gradient-to-br from-blue-100 to-purple-200'>
      <Snackbar
        open={flag}
        autoHideDuration={10000}
        onClose={handleClose}
        message="Success! Your profile has been created!"
      />
       <Snackbar
        open={inc}
        autoHideDuration={5000}
        onClose={handleClose2}
        message="Please fill all the inputs"
      />
      <Snackbar
        open={nf}
        autoHideDuration={7000}
        onClose={handleClose3}
        message="There is already a profile with this username. Please try again"
      />
    <div className="flex justify-center items-center min-h-screen ">
    <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden max-h-[630px] max-w-[910px] py-[50px]">
      {/* Left side - Card */}
      <div className="w-full lg:w-1/2 p-8 h-fit">
        <div className="text-start">
          <h1 className="text-[30px] font-bold text-gray-800">Sign Up</h1>
          <p className="mt-3 text-lg text-[#949494]">
            Welcome to Product! Please sign up to continue
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="email"
                id="email"
                placeholder="john_doe"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="John@Doe"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => {
                  setPass(e.target.value)
                  console.log(pass)
                }}
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              className="w-[80%] bg-[#47afff] text-white py-3 rounded-lg hover:bg-[#2ba1fc] mt-[30px]"
              onClick={fetchCookie}
            >
              CREATE ACCOUNT
            </button>
          </div>
          <br />
          <div className="text-center" onClick={(e) => {
            e.preventDefault()
            router.push("/login")
          }}>
            <button className="text-blue-600 hover:underline text-sm">Already registered? Click to Log in!</button>
          </div>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-full lg:w-1/2 bg-gradient-to-br from-purple-300 to-blue-200">
        <div className="h-full flex justify-center items-center">
          <Image
            src={img}
            alt="Bubble Background"
            className="max-w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    
  </div>
  {load && !inc && <p className="text-center text-[25px]">Loading...</p>}
  </div>
  );
}

export default Page;