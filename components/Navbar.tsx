"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/new-response", label: "New Response" },
  { href: "/saved-notes", label: "Saved Notes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        >
          ClassSupport
        </Link>

        {!isAuthPage && (
          <>
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`min-h-[44px] px-3 flex items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    pathname === link.href
                      ? "bg-accent text-white"
                      : "text-gray-mid hover:bg-gray-light"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="min-h-[44px] ml-1 px-3 flex items-center rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
              >
                Log out
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {/* Mobile dropdown */}
      {!isAuthPage && menuOpen && (
        <div className="sm:hidden border-t border-border bg-white px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                pathname === link.href
                  ? "bg-accent text-white"
                  : "text-gray-mid hover:bg-gray-light"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
