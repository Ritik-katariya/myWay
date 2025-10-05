"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export function FuturisticHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 pt-2 left-0 right-0 z-50 transition-all duration-300  w-[90%] mx-auto ${
        isScrolled
          ? " backdrop-blur-md  border-cyan-500/20 "
          : " backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Image src="/logo.png" alt="logo" width={140} height={100} />

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/70 w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
            <Input
              placeholder="Search portfolios, skills, or developers..."
              className="pl-10 bg-[#0a1628]/80 border border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 h-10 rounded-lg"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <Link href="/auth">
              <Button className="bg-sky-800 hover:bg-sky-700 text-white font-medium px-6 h-10 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-white bg-sky-900 px-3 text-base py-1 rounded-lg">
                    Dashboard
                  </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#020618]/98 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(6,182,212,0.1)]">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/70 w-4 h-4" />
              <Input
                placeholder="Search portfolios..."
                className="pl-10 bg-[#0a1628]/80 border border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all h-10 rounded-lg"
              />
            </div>

            {/* Mobile Auth */}
            <div className="flex flex-col gap-3">
              <SignedOut>
                <Link href="/auth" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium h-10 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-center py-2 gap-4  ">
                  <Link href="/dashboard" className="text-white bg-sky-900 px-3 text-sm py-1 rounded-lg">
                    Dashboard
                  </Link>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
