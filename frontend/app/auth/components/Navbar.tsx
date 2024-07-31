"use client";

import React from 'react';
import { Switch } from '@/components/ui/switch';

interface NavbarProps {
  role: 'student' | 'staff';
  setRole: React.Dispatch<React.SetStateAction<'student' | 'staff'>>;
}

const Navbar: React.FC<NavbarProps> = ({ role, setRole }) => {
  const handleSwitchChange = (checked: boolean) => {
    const newRole = checked ? 'staff' : 'student';
    setRole(newRole);
  };

  return (
    <nav className="flex justify-between items-center p-4 text-white">
      <h1 className="text-xl font-bold">EduGhana</h1>
      <div className="flex items-center space-x-4">
        <span className="text-lg">Student</span>
        <Switch
          checked={role === 'staff'}
          onCheckedChange={(checked) => handleSwitchChange(checked)}
          className="transition-transform bg-gradient-to-r from-red-500 to-purple-500 inset-3 duration-300"
        />
        <span className="text-lg">Staff</span>
      </div>
    </nav>
  );
};

export default Navbar;
