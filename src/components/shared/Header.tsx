"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Lavishly_Yours } from 'next/font/google';
import { BookModal } from "../BookModal";
import Link from 'next/link';


const lavishlyYours = Lavishly_Yours({
  weight: '400', // or ['400'] if multiple weights are supported
  subsets: ['latin'],
  
});

export function Header() {
  const navItems = [
    {
      name: "About",
      link: "#About",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Experience",
      link: "#experience",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full top-2   z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* <NavbarLogo /> */}
          <h3 className="text-2xl text-neutral-100 font-bold ml-4">
            <Link href="/" className={lavishlyYours.className} >
              Ritik Katariya
            </Link>
          </h3>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
           
            <NavbarButton variant="primary" ><BookModal/></NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
             <h3 className="text-base text-neutral-100 font-bold ml-4">
            <Link href="/" className={lavishlyYours.className} >
              Ritik Katariya
            </Link>
          </h3>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
             
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* <DummyContent /> */}

      {/* Navbar */}
    </div>
  );
}

