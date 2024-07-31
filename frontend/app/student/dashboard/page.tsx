import React from "react";
import { Cards } from "./components/Cards";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

type Props = {};

const words = [
  {
    text: "Access",
  },
  {
    text: "all",
  },
  {
    text: "your",
  },
  {
    text: "menus",
  },
  {
    text: "on",
  },
  {
    text: "the",
  },
  {
    text: "Dashboard.",
    className: "text-blue-500 dark:text-blue-500",
  },
];
function page({}: Props) {
  return (
    <div>
      <TypewriterEffectSmooth words={words} />
      <Cards />
    </div>
  );
}

export default page;
