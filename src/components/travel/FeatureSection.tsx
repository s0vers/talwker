"use client";

import {
  Shield,
  Clock,
  HeadphonesIcon,
  CreditCard,
  Award,
  Globe,
  Users,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments and personal data are protected with enterprise-grade security.",
  },
  {
    icon: Clock,
    title: "Flexible Cancellation",
    description: "Plans change. Get a full refund up to 48 hours before your trip starts.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our travel experts are available around the clock to assist you.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you 10% off.",
  },
];

const statsFeatures = [
  { icon: Globe, value: "100+", label: "Destinations" },
  { icon: Users, value: "50K+", label: "Happy Travelers" },
  { icon: Plane, value: "1000+", label: "Trips Completed" },
  { icon: Award, value: "4.9", label: "Average Rating" },
];

interface FeatureSectionProps {
  features?: Feature[];
  variant?: "default" | "cards" | "stats" | "minimal";
  className?: string;
}

export function FeatureSection({
  features = defaultFeatures,
  variant = "default",
  className,
}: FeatureSectionProps) {
  if (variant === "stats") {
    return (
      <section className={cn("py-16", className)}>
        <div className="container-travel">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsFeatures.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-1 text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className={cn("bg-slate-50 py-20", className)}>
        <div className="container-travel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Why Travel With Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We go above and beyond to make your travel dreams come true
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white p-6 shadow-card transition-all hover:-translate-y-2 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-500 text-white transition-transform group-hover:scale-110">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("border-y bg-white py-8", className)}>
        <div className="container-travel">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:justify-between">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <feature.icon className="h-6 w-6 text-primary" />
                <span className="font-medium text-slate-700">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn("py-20", className)}>
      <div className="container-travel">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trust badges for checkout/booking
export function TrustBadges({ className }: { className?: string }) {
  const badges = [
    { icon: Shield, label: "Secure Checkout" },
    { icon: CreditCard, label: "Safe Payment" },
    { icon: Clock, label: "Instant Confirmation" },
    { icon: HeadphonesIcon, label: "24/7 Support" },
  ];

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-6", className)}>
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2 text-slate-600">
          <badge.icon className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
