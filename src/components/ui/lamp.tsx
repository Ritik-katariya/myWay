"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import profile from "../../../public/profile.png";

export function Lamp() {
  return (
    <LampContainer>
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-600 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl flex flex-col items-center justify-center gap-3"
        >
          About Me
          <span className="text-gray-300 text-lg md:text-xl font-medium tracking-wide uppercase letter-spacing-wider border-b border-slate-500 pb-2">
            Full Stack Developer
          </span>
        </motion.h1>
        
        <div className="md:flex items-center justify-between gap-12 mt-12 w-full max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex-1 space-y-6"
          >
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 text-justify md:text-left font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam quibusdam alias magni odit consectetur quos facere iusto? Quasi, alias.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-slate-400 text-justify md:text-left font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum corrupti maxime ipsa qui assumenda quis aliquam dignissimos officiis voluptatum officia.
            </p>
          </motion.div>
          
          <div className="flex-shrink-0 mt-8 md:mt-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src={profile}
                alt="Professional Profile"
                width={320}
                height={320}
                className="relative rounded-xl shadow-2xl object-cover border-2 border-slate-700 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-start items-center gap-8 md:gap-12 mt-12 w-full max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full animate-pulse"></div>
            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent tracking-wide">
              20+
            </p>
            <span className="text-sm md:text-base text-slate-400 font-light uppercase tracking-wider">
              Projects
            </span>
          </div>
          
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full animate-pulse"></div>
            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent tracking-wide">
              1+
            </p>
            <span className="text-sm md:text-base text-slate-400 font-light uppercase tracking-wider">
              Years of Experience
            </span>
          </div>
        </div>
      </div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mt-20">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>

      <div className="relative z-50 flex -translate-y-60 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
