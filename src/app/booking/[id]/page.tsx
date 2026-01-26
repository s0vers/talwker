"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { cn } from "@/lib/utils";
import { tripPackages } from "@/lib/data";

const steps = ["Details", "Traveler", "Payment", "Confirmed"];

export default function BookingPage() {
  const params = useParams();
  const trip = tripPackages.find((t) => t.id === params.id);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(trip?.departureDates[0] || "");
  const [travelers, setTravelers] = useState(2);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", agree: false });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground">Trip not found</p>
          <Link href="/search" className="text-primary text-sm mt-2 inline-block hover:underline">
            Browse trips
          </Link>
        </div>
      </div>
    );
  }

  const total = trip.price.amount * travelers;

  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-secondary pt-20 pb-16">
      <div className="container-main">
        <Link
          href={`/trips/${trip.id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to trip
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  currentStep > i
                    ? "bg-green-500 text-white"
                    : currentStep === i
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > i ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:inline",
                  currentStep >= i ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-2" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1">
            {currentStep === 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground">Select Trip Details</h2>

                <div className="mt-6">
                  <label className="text-sm font-medium text-foreground">Departure Date</label>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {trip.departureDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "py-3 text-sm rounded-lg border-2 transition-colors",
                          selectedDate === date
                            ? "border-primary bg-primary/5 text-primary font-medium"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium text-foreground">Number of Travelers</label>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-12 h-12 rounded-lg border border-border text-foreground hover:bg-secondary"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-foreground w-8 text-center">{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-12 h-12 rounded-lg border border-border text-foreground hover:bg-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="mt-8 w-full btn-primary py-3"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground">Traveler Information</h2>
                <p className="text-sm text-muted-foreground mt-1">Lead traveler details</p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input
                      className="mt-1.5"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      className="mt-1.5"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      className="mt-1.5"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      className="mt-1.5"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={handleBack} className="btn-outline">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button onClick={handleNext} className="flex-1 btn-primary py-3">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground">Payment Details</h2>
                <p className="text-sm text-muted-foreground mt-1">Secured with SSL encryption</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Card Number</label>
                    <Input className="mt-1.5" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Expiry Date</label>
                      <Input className="mt-1.5" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">CVC</label>
                      <Input className="mt-1.5" placeholder="123" />
                    </div>
                  </div>
                </div>

                <label className="mt-6 flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.agree}
                    onCheckedChange={(c) => setForm({ ...form, agree: c as boolean })}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                    <Link href="/cancellation" className="text-primary hover:underline">Cancellation Policy</Link>
                  </span>
                </label>

                <div className="mt-8 flex gap-3">
                  <button onClick={handleBack} className="btn-outline">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.agree || isProcessing}
                    className="flex-1 btn-primary py-3 disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : `Pay $${total}`}
                  </button>
                </div>

                <div className="mt-6">
                  <TrustBadges />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground">Booking Confirmed!</h2>
                <p className="mt-2 text-muted-foreground">
                  Confirmation sent to {form.email || "your email"}
                </p>
                <div className="mt-6 inline-block bg-secondary px-6 py-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">Booking Reference</p>
                  <p className="text-xl font-bold text-primary mt-1">
                    TW-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="btn-outline">Home</Link>
                  <Link href="/search" className="btn-primary">Explore More Trips</Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          {currentStep < 3 && (
            <div className="lg:w-80">
              <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={trip.coverImage} alt={trip.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-2">{trip.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {trip.destination.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground">{trip.duration.days} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="text-foreground">{travelers}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">${total}</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
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
