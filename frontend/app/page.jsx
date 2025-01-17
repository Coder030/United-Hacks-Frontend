"use client";

import Image from "next/image";
import img1 from "../public/dummyimage.png";
import BlurText from "./Components/BlurText";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full">
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
            text="Project !!"
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
            className="max-w-[90%] h-auto object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
