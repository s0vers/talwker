"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  CreditCard,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const footerLinks = {
  destinations: [
    { label: "Asia", href: "/search?region=asia" },
    { label: "Europe", href: "/search?region=europe" },
    { label: "Americas", href: "/search?region=americas" },
    { label: "Africa", href: "/search?region=africa" },
    { label: "Oceania", href: "/search?region=oceania" },
  ],
  tripTypes: [
    { label: "Adventure Tours", href: "/search?category=adventure" },
    { label: "Beach Holidays", href: "/search?category=beach" },
    { label: "Cultural Tours", href: "/search?category=cultural" },
    { label: "Wildlife Safari", href: "/search?category=safari" },
    { label: "Romantic Getaways", href: "/search?category=romantic" },
    { label: "Family Vacations", href: "/search?category=family" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Affiliate Program", href: "/affiliates" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Booking Guide", href: "/booking-guide" },
    { label: "Cancellation Policy", href: "/cancellation" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-travel py-12">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold">
                Get Exclusive Travel Deals
              </h3>
              <p className="mt-2 text-slate-400">
                Subscribe to our newsletter and receive up to 30% off on your first trip
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/10 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className={cn(
                  "flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all",
                  isSubscribed
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {isSubscribed ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-travel py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/simple.png"
                alt="Talkwer"
                width={140}
                height={40}
                className="rounded-lg bg-primary p-2"
              />
            </Link>
            <p className="mt-6 text-slate-400">
              Discover the world with Talkwer. We craft unforgettable travel
              experiences that inspire and delight travelers from around the globe.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-primary" />
                +1 (234) 567-890
              </a>
              <a
                href="mailto:hello@talkwer.com"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 text-primary" />
                hello@talkwer.com
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>123 Travel Street, Adventure City, AC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-primary hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Trip Types</h4>
            <ul className="space-y-3">
              {footerLinks.tripTypes.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-travel py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <span>&copy; {new Date().getFullYear()} Talkwer. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-slate-400" />
                <div className="flex gap-1">
                  {["Visa", "MC", "Amex", "PayPal"].map((card) => (
                    <span
                      key={card}
                      className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-400"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
