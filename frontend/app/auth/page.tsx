"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ExpandableCardDemo } from "../components/Users";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const AuthPage: React.FC = () => {
  const [role, setRole] = useState<"student" | "staff">("student");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch users based on the selected role
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/${role}s`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [role]); // Refetch users when role changes

  const handleUserSelect = (userId: number) => {
    window.location.href = role === "student" ? `/student` : `/staff/`;
  };

  const words = [
    {
      text: "Select",
    },
    {
      text: "a",
    },
    {
      text: "user",
    },
  ];

  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 text-white font-bold">
        <Navbar role={role} setRole={setRole} />
        <main className="flex flex-col justify-center items-center min-h-screen p-4">
          <TypewriterEffectSmooth words={words} />
          <ExpandableCardDemo
            users={users}
            role={role}
            onUserSelect={handleUserSelect}
          />
        </main>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default AuthPage;
