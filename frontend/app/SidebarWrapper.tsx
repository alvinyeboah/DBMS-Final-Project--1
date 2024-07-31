'use client'

import { usePathname } from 'next/navigation';
import { SidebarDemo } from './components/Sidebar';

export default function SidebarWrapper() {
  const pathname = usePathname();
  const showSidebar = pathname === '/student' || pathname === '/staff';

  if (!showSidebar) return null;

  return (
    <aside className="w-64 text-white h-screen">
      <SidebarDemo />
    </aside>
  );
}