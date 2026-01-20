"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Navbar() {

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-Us", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/pricing", label: "Pricing" },
    { href: "/booking", label: "Book Now" },
    { href: "/contact-Us", label: "Contact" },
  ];

  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 w-full z-50 bg-white/60 dark:bg-brand.soft backdrop-blur after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-black/10 dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none">
              <Bars3Icon className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Brand + Desktop Menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link
              href="/"
              className="text-lg md:text-xl font-semibold tracking-tight text-brand dark:text-white"
            >
              APD.by Pual-Ray-Vibes
            </Link>

            <div className="hidden sm:ml-8 sm:flex space-x-6">
              {navLinks.map(link => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-gray-700 dark:text-gray-300 hover:text-accent transition ${active ? "text-accent" : ""}`}
                  >
                    {link.label}
                    <span className={`absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-accent to-transparent transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Disclosure Panel) */}
      <DisclosurePanel className="sm:hidden bg-white/70 dark:bg-black/40 backdrop-blur border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2 px-4 py-3">
          {navLinks.map(link => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <DisclosureButton
                key={link.href}
                as={Link}
                href={link.href}
                className={`block py-2 text-base text-gray-700 dark:text-gray-300 hover:text-accent transition ${active ? "text-accent" : ""}`}
              >
                {link.label}
              </DisclosureButton>
            );
          })}

          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
