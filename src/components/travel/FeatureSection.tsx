"use client";

import { Shield, Clock, Headphones, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments are protected",
  },
  {
    icon: Clock,
    title: "Free Cancellation",
    description: "Cancel up to 48 hours before",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are always here to help",
  },
  {
    icon: Award,
    title: "Best Price",
    description: "Price match guarantee",
  },
];

interface FeatureSectionProps {
  className?: string;
}

export function FeatureSection({ className }: FeatureSectionProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-travel">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-slate-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500", className)}>
      <span className="flex items-center gap-1">
        <Shield className="h-4 w-4 text-green-600" />
        Secure Payment
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-green-600" />
        Instant Confirmation
      </span>
      <span className="flex items-center gap-1">
        <Headphones className="h-4 w-4 text-green-600" />
        24/7 Support
      </span>
    </div>
  );
}
