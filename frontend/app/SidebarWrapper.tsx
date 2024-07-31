"use client";

import { usePathname } from 'next/navigation';
import { SidebarStudent } from './components/SidebarStudent';
import { SidebarStaff } from './components/SidebarStaff';

export default function SidebarWrapper() {
  const pathname = usePathname();
  
  // Check if the pathname starts with `/student` or `/staff`
  const isStudentPage = pathname.startsWith('/student');
  const isStaffPage = pathname.startsWith('/staff');

  // Only show sidebar if on the appropriate pages
  if (!isStudentPage && !isStaffPage) return null;

  return (
    <aside className="w-auto text-white h-screen">
      {isStudentPage && <SidebarStudent />}
      {isStaffPage && <SidebarStaff />}
    </aside>
  );
}
