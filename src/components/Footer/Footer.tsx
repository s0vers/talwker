import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuInstagram, LuTwitter, LuFacebook, LuLinkedin, LuMail, LuMapPin } from "react-icons/lu";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[3rem] mt-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Newsletter Section */}
        <div className="mb-20 rounded-[2.5rem] bg-[var(--secondary)] p-8 md:p-16 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-white md:text-5xl mb-6">
                    Subscribe to Get Exclusive Deals
                </h2>
                <p className="text-white/80 text-lg mb-8">
                    Join our newsletter and get 20% off your first trip booking. No spam, just travel inspiration.
                </p>
                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <Button className="rounded-full bg-gray-900 px-8 py-6 text-lg font-bold hover:bg-gray-800">
                        Subscribe
                    </Button>
                </div>
            </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-12">
            <div className="space-y-6">
                <Link href="/" className="inline-block">
                     <Image
                        src="/simple.png"
                        alt="Talkwer logo"
                        width={140}
                        height={40}
                        className="brightness-0 invert p-1"
                    />
                </Link>
                <p className="text-gray-400 leading-relaxed">
                    Your trusted partner for exploring the world&apos;s most breathtaking destinations. We make travel easy and unforgettable.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="p-3 rounded-full bg-gray-800 text-white hover:bg-[var(--secondary)] transition-colors">
                        <LuInstagram className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="p-3 rounded-full bg-gray-800 text-white hover:bg-[var(--secondary)] transition-colors">
                        <LuTwitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="p-3 rounded-full bg-gray-800 text-white hover:bg-[var(--secondary)] transition-colors">
                        <LuFacebook className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-gray-400">
                    <li><Link href="/about" className="hover:text-[var(--secondary)]">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-[var(--secondary)]">Careers</Link></li>
                    <li><Link href="/blog" className="hover:text-[var(--secondary)]">Blog</Link></li>
                    <li><Link href="/press" className="hover:text-[var(--secondary)]">Press</Link></li>
                </ul>
            </div>

             <div>
                <h4 className="text-lg font-bold mb-6">Support</h4>
                <ul className="space-y-4 text-gray-400">
                    <li><Link href="/contact" className="hover:text-[var(--secondary)]">Contact Us</Link></li>
                    <li><Link href="/faq" className="hover:text-[var(--secondary)]">FAQs</Link></li>
                    <li><Link href="/terms" className="hover:text-[var(--secondary)]">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="hover:text-[var(--secondary)]">Privacy Policy</Link></li>
                </ul>
            </div>

             <div>
                <h4 className="text-lg font-bold mb-6">Contact</h4>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-center gap-3">
                        <LuMapPin className="h-5 w-5 text-[var(--secondary)]" />
                        <span>123 Travel St, New York, NY</span>
                    </li>
                     <li className="flex items-center gap-3">
                        <LuMail className="h-5 w-5 text-[var(--secondary)]" />
                        <span>support@talkwer.com</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Talkwer Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
