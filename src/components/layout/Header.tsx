"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  Globe,
  Phone,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: "Destinations",
    href: "/search",
    children: [
      { label: "Asia", href: "/search?region=asia" },
      { label: "Europe", href: "/search?region=europe" },
      { label: "Americas", href: "/search?region=americas" },
      { label: "Africa", href: "/search?region=africa" },
      { label: "Oceania", href: "/search?region=oceania" },
    ],
  },
  {
    label: "Trip Types",
    href: "/search",
    children: [
      { label: "Adventure", href: "/search?category=adventure" },
      { label: "Beach & Relaxation", href: "/search?category=beach" },
      { label: "Cultural Tours", href: "/search?category=cultural" },
      { label: "Wildlife Safari", href: "/search?category=safari" },
      { label: "Romantic Getaways", href: "/search?category=romantic" },
      { label: "Family Vacations", href: "/search?category=family" },
    ],
  },
  { label: "Deals", href: "/deals" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top bar - visible only on desktop */}
      <div className="hidden border-b bg-slate-900 py-2 text-sm text-white lg:block">
        <div className="container-travel flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Available 24/7 for your travel needs</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Globe className="h-4 w-4" />
              <span>EN</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <span className="text-slate-500">|</span>
            <span>USD ($)</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container-travel">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2">
              <Image
                src="/simple.png"
                alt="Talkwer"
                width={140}
                height={40}
                className={cn(
                  "rounded-lg p-2 transition-all",
                  isScrolled ? "bg-primary" : "bg-primary"
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-4 py-2 font-medium transition-colors",
                      isScrolled
                        ? "text-slate-700 hover:bg-slate-100 hover:text-primary"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-2"
                        >
                          <div className="min-w-[200px] rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  "rounded-full p-2.5 transition-colors",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/wishlist"
                className={cn(
                  "hidden rounded-full p-2.5 transition-colors md:block",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              <Link
                href="/account"
                className={cn(
                  "hidden rounded-full p-2.5 transition-colors md:block",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              <Link
                href="/search"
                className={cn(
                  "hidden rounded-full px-6 py-2.5 font-semibold transition-all lg:block",
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white text-slate-900 hover:bg-white/90"
                )}
              >
                Book Now
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "rounded-full p-2.5 transition-colors lg:hidden",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm overflow-y-auto bg-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <Image
                  src="/simple.png"
                  alt="Talkwer"
                  width={120}
                  height={32}
                  className="rounded-lg bg-primary p-2"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {navigation.map((item) => (
                  <div key={item.label} className="border-b py-2">
                    {item.children ? (
                      <MobileDropdown item={item} onClose={() => setIsMobileMenuOpen(false)} />
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-lg font-medium text-slate-900"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="border-t p-4">
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary mb-3 w-full text-center"
                >
                  Book Now
                </Link>
                <div className="flex gap-4">
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium"
                  >
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium"
                  >
                    <User className="h-5 w-5" />
                    Account
                  </Link>
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-slate-50 p-4 text-sm text-slate-600">
                <a href="tel:+1234567890" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-890
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile Dropdown Component
function MobileDropdown({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-lg font-medium text-slate-900"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-3 pl-4">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={onClose}
                  className="block rounded-lg py-2 text-slate-600 hover:text-primary"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
