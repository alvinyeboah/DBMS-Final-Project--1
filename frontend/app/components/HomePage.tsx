"use client";
import { WavyBackground } from "@/components/ui/wavy-background";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";

export function HomePage() {
  const words = ["better", "advanced", "beautiful", "modern"];
  return (
    
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
        Welcome to Our Group&apos;s Database Project
        </div>
        <div className="font-extralight text-center text-base md:text-4xl text-neutral-200 py-4">
          And this, is our<FlipWords words={words} />system.
        </div>
        <Link href='/auth'>
          <Button className="w-[9rem] h-[3rem] px4 py-2 rounded-sm bg-white text-black hover:text-white">Select your user</Button>
        </Link>
      </motion.div>
    </WavyBackground>
  );
}
