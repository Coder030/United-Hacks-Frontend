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
    <div className="min-h-[80vh] flex items-center justify-center border-b">
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
    <div className="py-16">
  {/* Objective Section */}
  <div className="flex items-center flex-col w-full">
    <p className="text-4xl font-bold text-gray-800 mb-6">Objective</p>
    <p className="w-[80%] text-lg text-gray-600 leading-relaxed text-center">
      Our goal is to empower all Indians to address local neighborhood issues
      efficiently by providing a platform for reporting and tracking problems
      like garbage disposal, damaged roads, malfunctioning electricity poles,
      and other civic concerns.
    </p>
  </div>

  {/* Idea Section */}
  <div className="flex items-center flex-col w-full mt-20">
    <p className="text-4xl font-bold text-gray-800 mb-6">Idea</p>
    <p className="w-[80%] text-lg text-gray-600 leading-relaxed text-center">
      Our idea germinated from our daily observance of civic issues that
      remained unresolved. Yes, we could sit and complain about civic apathy,
      about citizen and government indifference, and just blame everyone.
      Instead, we thought of making an attempt to change the status quo. Many
      areas across India face issues like garbage, broken roads, and poor
      maintenance but there’s no easy way for locals to report them. Our
      platform solves this by connecting everyday people directly with
      municipal authorities to ensure action is taken.
    </p>
  </div>

  {/* Project Section */}
  <div className="flex items-center flex-col w-full mt-20">
    <p className="text-4xl font-bold text-gray-800 mb-6">Project</p>
    <p className="w-[80%] text-lg text-gray-600 leading-relaxed text-center">
      Our project is a website and mobile app that enables users to capture and
      report neighborhood issues with ease. When a user uploads a photo (via
      camera or gallery), the app automatically determines the exact location
      of the issue using GPS and APIs. It then identifies the appropriate
      district municipality official and sends an automatic email detailing the
      problem, complete with the image.
    </p>
    <p className="w-[80%] text-lg text-gray-600 leading-relaxed ml-[40px] mt-8">
      The companion website serves as a hub for tracking progress, allowing
      users to:
    </p>
    <ul className="list-disc w-[80%] text-lg text-gray-600 leading-relaxed mt-6 space-y-3 ml-[40px]">
      <li>Mark issues as resolved.</li>
      <li>View pending and completed reports.</li>
      <li>
        Explore a leaderboard showcasing districts ranked by the number of
        resolved issues.
      </li>
    </ul>
    <p className="w-[80%] text-lg text-gray-600 leading-relaxed text-center mt-8">
      The platform also displays all reported issues within a 5-km radius,
      fostering greater community involvement.
    </p>
  </div>

  {/* Technical Highlights Section */}
  <div className="flex items-center flex-col w-full mt-20">
    <p className="text-4xl font-bold text-gray-800 mb-6">Technical Highlights</p>
    <div className="w-[80%] text-lg text-gray-600 leading-relaxed space-y-6">
      <p>
        <b>SMTP:</b> We use SMTP for sending automated emails to municipal
        officials with issue details and images.
      </p>
      <p>
        <b>Geolocation:</b> The app leverages GPS and geolocation APIs to
        pinpoint the exact location of reported issues and to check the radius
        of people.
      </p>
      <p>
        <b>Cloudinary:</b> Images uploaded by users are stored and managed on
        Cloudinary.
      </p>
      <p>
        <b>Google Firebase:</b> Firebase is used for real-time database
        management, providing scalability and dynamic data handling without
        hardcoding, allowing for future expansion with additional datasets and
        integrations.
      </p>
    </div>
  </div>
</div>
</div>
  );
}