"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Destinations", href: "/search" },
  { label: "Trips", href: "/search" },
  { label: "Deals", href: "/deals" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="container-main">
        <div className="flex h-16 lg:h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/simple.png"
              alt="Talkwer"
              width={110}
              height={32}
              className={cn(
                "h-8 w-auto transition-all",
                !isScrolled && "brightness-0 invert"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              className={cn(
                "p-2 rounded-lg transition-colors hidden sm:flex",
                isScrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              className={cn(
                "p-2 rounded-lg transition-colors hidden sm:flex",
                isScrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <div className={cn(
              "hidden sm:block",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              <ThemeToggle />
            </div>

            <Link
              href="/search"
              className={cn(
                "hidden lg:inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg transition-all ml-2",
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              )}
            >
              Book Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-foreground hover:bg-secondary"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background absolute left-0 right-0 top-16 shadow-lg">
            <div className="container-main">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">Theme</span>
                </div>
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
