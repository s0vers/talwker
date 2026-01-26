"use client";

import { Shield, CreditCard, Headphones, Award, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  className?: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments are protected with enterprise-grade security",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options including cards and digital wallets",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our travel experts are available around the clock",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Found a lower price? We will match it plus give you 10% off",
  },
];

export function FeatureSection({ className }: FeatureSectionProps) {
  return (
    <section className={cn("section-padding bg-secondary", className)}>
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Us</span>
          <h2 className="heading-2 mt-2">Travel With Confidence</h2>
          <p className="mt-3 text-muted-foreground">
            We go above and beyond to ensure your journey is seamless
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trust Badges for booking sidebar
export function TrustBadges() {
  const badges = [
    { icon: Shield, label: "Secure Payment" },
    { icon: Award, label: "Best Price Guarantee" },
    { icon: Headphones, label: "24/7 Support" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 py-3">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <badge.icon className="h-3.5 w-3.5 text-primary" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
