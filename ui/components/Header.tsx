import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  return (
    <header className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
       <a href="/" className="text-xl font-bold flex items-center gap-2">
          <FontAwesomeIcon icon={faNetworkWired} />
          MUDGuard
        </a>
        <nav className="space-x-6 text-md font-medium">
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
