import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { LuMenu } from "react-icons/lu";

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <header className="top-0 flex h-16 items-center gap-4 px-4 md:px-6 z-50 absolute w-full">
        <nav className="flex gap-4 items-center w-full justify-between">
          <Image
            src="/simple.png"
            alt="Talkwer logo"
            width={100}
            height={32}
            className="bg-orange-400 p-1 rounded-md"
          />
          <div className="hidden md:flex gap-8 w-full justify-center align-middle items-center text-xl font-semibold text-orange-400/65">
            <Link href="/travel">Travel</Link>
            <Link href="/technology">Technology</Link>
            <Link href="/food">Food</Link>
            <Link href="/lifestyle">Lifestyle</Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <div className="md:hidden">
                <LuMenu className="h-8 w-8" />
                <span className="sr-only">Toggle navigation menu</span>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="bg-orange-100">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    src="/simple.png"
                    alt="Talkwer logo"
                    width={150}
                    height={32}
                    className="bg-orange-400 p-1 rounded-md"
                  />
                </Link>
                <div className="flex flex-col gap-4 text-xl text-[#2a9d8f] font-semibold">
                  <Link href="/travel">Travel</Link>
                  <Link href="/technology">Technology</Link>
                  <Link href="/food">Food</Link>
                  <Link href="/lifestyle">Lifestyle</Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      {children}
    </main>
  );
}
