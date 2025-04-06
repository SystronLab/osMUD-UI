import React from "react";

export default function Header() {
  return (
    <header className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/overview" className="text-xl font-bold">
          MUDGuard
        </a>
        <nav className="space-x-6 text-sm font-medium">
          <a href="/overview" className="hover:underline">
            Devices
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
