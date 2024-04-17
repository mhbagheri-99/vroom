import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1
    px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="VROOM Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-white text-[26px] font-extrabold 
        max-sm:hidden">VROOM</p>
      </Link>
      <div className="flex-between gap-5">
        {/* Add the MobileNav component here */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
