"use client";

import Image from "next/image";
import img1 from "./favicon.ico";
import BlurText from "./Components/BlurText";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const [currentName, setCurrentName] = useState('')
  const [currentId, setCurrentId] = useState('')
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response2 = await fetch('http://localhost:2000/api/me/', {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     const data3 = await response2.json()
  //     if (data3['message'] === 'nvt') {
  //       router.push('/login')
  //     }
  //     else{
  //       setCurrentId(data3['data']['id'])
  //       setCurrentName(data3['data']['username'])
  //     }
  //   }
  //   fetchData()
  // }, [router])
  return (
    <div>
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Blur Text Section */}
        <div className="flex flex-row lg:flex-col w-full lg:w-[50%] text-[30px] md:text-[60px] lg:text-[70px] xl:text-[100px] mt-[30px] justify-center sm:justify-left lg:ml-[100px]">
          <BlurText
            text="Welcome"
            delay={150}
            animateBy="words"
            direction="top"
            className="ml-[10px]"
          />
          <BlurText
            text="To"
            delay={150}
            animateBy="words"
            direction="top"
            className="ml-[10px]"
          />
          <BlurText
            text="Snap2Action!!"
            delay={150}
            animateBy="words"
            direction="top"
            className="ml-[10px]"
          />
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-[50%] mt-5 md:mt-0 flex justify-center md:justify-center">
          <Image
            src={img1}
            alt="Product Image"
            className="max-w-[70%] h-auto object-contain mx-auto"
          />
        </div>
      </div>
    </div>
    </div>
  );
}