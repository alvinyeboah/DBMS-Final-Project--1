"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

interface ExpandableCardDemoProps {
  users: User[];
  role: 'student' | 'staff';
  onUserSelect: (userId: number) => void;
}

export function ExpandableCardDemo({ users, role, onUserSelect }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<User | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.first_name}-${active.last_name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-black rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.first_name}-${active.last_name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.first_name}-${active.last_name}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src="https://assets.aceternity.com/demos/lana-del-rey.jpeg"
                  alt={`${active.first_name} ${active.last_name}`}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.first_name}-${active.last_name}-${id}`}
                      className="font-bold text-neutral-200"
                    >
                      {active.first_name} {active.last_name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.first_name}-${active.last_name}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.email}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.first_name}-${active.last_name}-${id}`}
                    onClick={() => onUserSelect(active.id)}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Go to My Page
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>Date of Birth: {active.date_of_birth}</p>
                    <p>Role: {role}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {users.map((user) => (
          <motion.div
            layoutId={`card-${user.first_name}-${user.last_name}-${id}`}
            key={`card-${user.first_name}-${user.last_name}-${id}`}
            onClick={() => setActive(user)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${user.first_name}-${user.last_name}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src="https://assets.aceternity.com/demos/lana-del-rey.jpeg"
                  alt={`${user.first_name} ${user.last_name}`}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${user.first_name}-${user.last_name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {user.first_name} {user.last_name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${user.first_name}-${user.last_name}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {user.email}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${user.first_name}-${user.last_name}-${id}`}
              onClick={(e) => {
                e.stopPropagation();
                onUserSelect(user.id);
              }}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              Go to My Page
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
