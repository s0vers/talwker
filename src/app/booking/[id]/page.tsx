"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Users,
  Calendar,
  Shield,
  CreditCard,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { cn } from "@/lib/utils";
import { tripPackages } from "@/lib/data";

const steps = [
  { id: 1, name: "Trip Details", icon: Calendar },
  { id: 2, name: "Traveler Info", icon: Users },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: Check },
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const trip = tripPackages.find((t) => t.id === params.id);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(trip?.departureDates[0] || "");
  const [travelers, setTravelers] = useState(2);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeTerms: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Trip not found</h1>
          <Link href="/search" className="mt-4 inline-block text-primary">
            Browse all trips
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = trip.price.amount * travelers;
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24">
      <div className="container-travel">
        {/* Back Button */}
        <Link
          href={`/trips/${trip.id}`}
          className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to trip details
        </Link>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-1 items-center",
                  index !== steps.length - 1 && "relative"
                )}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                        ? "bg-primary text-white"
                        : "bg-slate-200 text-slate-500"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 hidden text-sm font-medium sm:block",
                      currentStep >= step.id
                        ? "text-slate-900"
                        : "text-slate-400"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-4 h-1 flex-1 rounded-full transition-all",
                      currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1: Trip Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl bg-white p-6 shadow-card"
                >
                  <h2 className="text-xl font-bold text-slate-900">
                    Select Trip Details
                  </h2>

                  {/* Date Selection */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-slate-700">
                      Departure Date
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {trip.departureDates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            "rounded-xl border-2 p-4 text-center transition-all",
                            selectedDate === date
                              ? "border-primary bg-primary/5"
                              : "border-slate-200 hover:border-primary/50"
                          )}
                        >
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(date).getFullYear()}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-slate-700">
                      Number of Travelers
                    </label>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-medium hover:bg-slate-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-xl font-semibold">
                        {travelers}
                      </span>
                      <button
                        onClick={() =>
                          setTravelers(Math.min(trip.groupSize.max, travelers + 1))
                        }
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-medium hover:bg-slate-50"
                      >
                        +
                      </button>
                      <span className="text-sm text-slate-500">
                        (Max {trip.groupSize.max} travelers)
                      </span>
                    </div>
                  </div>

                  {/* Trip Summary */}
                  <div className="mt-8 rounded-xl bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-900">Trip Summary</h3>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Departure</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration</span>
                        <span className="font-medium">
                          {trip.duration.days} Days / {trip.duration.nights} Nights
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Travelers</span>
                        <span className="font-medium">{travelers}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white transition-all hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Traveler Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl bg-white p-6 shadow-card"
                >
                  <h2 className="text-xl font-bold text-slate-900">
                    Traveler Information
                  </h2>
                  <p className="mt-1 text-slate-600">
                    Please enter the details for the lead traveler
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        First Name
                      </label>
                      <Input
                        className="mt-1"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Last Name
                      </label>
                      <Input
                        className="mt-1"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <Input
                        className="mt-1"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Phone
                      </label>
                      <Input
                        className="mt-1"
                        type="tel"
                        placeholder="+1 (234) 567-8900"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-slate-700">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-input p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Dietary requirements, accessibility needs, etc."
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <p className="text-sm text-slate-600">
                      Additional traveler details will be collected after booking
                    </p>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 rounded-xl border px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary/90"
                    >
                      Continue to Payment
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl bg-white p-6 shadow-card"
                >
                  <h2 className="text-xl font-bold text-slate-900">
                    Payment Details
                  </h2>
                  <p className="mt-1 text-slate-600">
                    Your payment is secured with SSL encryption
                  </p>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-slate-700">
                      Card Number
                    </label>
                    <Input
                      className="mt-1"
                      placeholder="1234 5678 9012 3456"
                      icon={<CreditCard className="h-5 w-5" />}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Expiry Date
                      </label>
                      <Input className="mt-1" placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        CVC
                      </label>
                      <Input
                        className="mt-1"
                        placeholder="123"
                        icon={<Lock className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-slate-700">
                      Cardholder Name
                    </label>
                    <Input className="mt-1" placeholder="John Doe" />
                  </div>

                  {/* Terms */}
                  <div className="mt-6 flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeTerms: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed text-slate-600"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/cancellation"
                        className="text-primary hover:underline"
                      >
                        Cancellation Policy
                      </Link>
                    </label>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 rounded-xl border px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.agreeTerms || isProcessing}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Pay ${totalPrice}
                        </>
                      )}
                    </button>
                  </div>

                  <TrustBadges className="mt-6" />
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-white p-8 text-center shadow-card"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    Booking Confirmed!
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Thank you for booking with us. A confirmation email has been
                    sent to {formData.email || "your email"}.
                  </p>

                  <div className="mx-auto mt-8 max-w-sm rounded-xl bg-slate-50 p-4 text-left">
                    <p className="text-sm font-medium text-slate-900">
                      Booking Reference
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      TW-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                      href="/"
                      className="rounded-xl border px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-50"
                    >
                      Return Home
                    </Link>
                    <Link
                      href="/search"
                      className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90"
                    >
                      Explore More Trips
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:w-96">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-card">
                <h3 className="font-semibold text-slate-900">Order Summary</h3>

                <div className="mt-4 flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={trip.coverImage}
                      alt={trip.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 line-clamp-2">
                      {trip.title}
                    </h4>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {trip.destination.name}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-medium">
                      {trip.duration.days}D / {trip.duration.nights}N
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Travelers</span>
                    <span className="font-medium">{travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      Price ({travelers}x ${trip.price.amount})
                    </span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalPrice}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  <Shield className="h-4 w-4" />
                  Free cancellation up to 48 hours before
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
