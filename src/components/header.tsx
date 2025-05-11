"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";

export const Header = () => {
  return (
    <header className="w-full px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-extrabold text-[#5147CF] tracking-tight font-sans">
            Moodtify
          </h1>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/about">
            <span className="text-sm font-medium text-[#2C296F] hover:text-[#5147CF] transition-colors">
              About
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-sm font-medium text-[#2C296F] hover:text-[#5147CF] transition-colors">
              Contact
            </span>
          </Link>
          <Link href="/privacy">
            <span className="text-sm font-medium text-[#2C296F] hover:text-[#5147CF] transition-colors">
              Privacy
            </span>
          </Link>
        </nav>
      </div>

      <Separator className="mt-4" />
    </header>
  );
};
