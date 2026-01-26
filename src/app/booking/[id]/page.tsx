"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { cn } from "@/lib/utils";
import { tripPackages } from "@/lib/data";

const steps = ["Details", "Traveler", "Payment", "Done"];

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
        <p>Trip not found</p>
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
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="container-travel">
        <Link href={`/trips/${trip.id}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium",
                  currentStep > i ? "bg-green-500 text-white" : currentStep === i ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                )}
              >
                {currentStep > i ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-sm hidden sm:inline", currentStep >= i ? "text-slate-900" : "text-slate-400")}>{step}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1">
            {currentStep === 0 && (
              <div className="bg-white rounded-xl border border-slate-100 p-6">
                <h2 className="font-semibold text-lg text-slate-900">Trip Details</h2>

                <div className="mt-6">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {trip.departureDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "py-2 text-sm rounded-lg border",
                          selectedDate === date ? "border-primary bg-primary/5 text-primary" : "border-slate-200"
                        )}
                      >
                        {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium text-slate-700">Travelers</label>
                  <div className="mt-2 flex items-center gap-4">
                    <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-10 h-10 rounded-lg border border-slate-200">-</button>
                    <span className="font-medium">{travelers}</span>
                    <button onClick={() => setTravelers(travelers + 1)} className="w-10 h-10 rounded-lg border border-slate-200">+</button>
                  </div>
                </div>

                <button onClick={handleNext} className="mt-8 w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-white rounded-xl border border-slate-100 p-6">
                <h2 className="font-semibold text-lg text-slate-900">Traveler Information</h2>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <Input className="mt-1" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <Input className="mt-1" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input className="mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Phone</label>
                    <Input className="mt-1" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-200 rounded-lg text-sm font-medium">Back</button>
                  <button onClick={handleNext} className="flex-1 bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl border border-slate-100 p-6">
                <h2 className="font-semibold text-lg text-slate-900">Payment</h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Card Number</label>
                    <Input className="mt-1" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Expiry</label>
                      <Input className="mt-1" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">CVC</label>
                      <Input className="mt-1" placeholder="123" />
                    </div>
                  </div>
                </div>

                <label className="mt-6 flex items-start gap-2 cursor-pointer">
                  <Checkbox checked={form.agree} onCheckedChange={(c) => setForm({ ...form, agree: c as boolean })} className="mt-0.5" />
                  <span className="text-sm text-slate-600">
                    I agree to the <Link href="/terms" className="text-primary">Terms</Link> and <Link href="/cancellation" className="text-primary">Cancellation Policy</Link>
                  </span>
                </label>

                <div className="mt-8 flex gap-3">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-200 rounded-lg text-sm font-medium">Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.agree || isProcessing}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
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
              <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">Booking Confirmed!</h2>
                <p className="mt-2 text-slate-500">Confirmation sent to {form.email || "your email"}</p>
                <div className="mt-6 inline-block bg-slate-50 px-6 py-3 rounded-lg">
                  <p className="text-xs text-slate-500">Booking Reference</p>
                  <p className="text-lg font-semibold text-primary">TW-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium">Home</Link>
                  <Link href="/search" className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium">Explore More</Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          {currentStep < 3 && (
            <div className="lg:w-80">
              <div className="bg-white rounded-xl border border-slate-100 p-5 sticky top-24">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={trip.coverImage} alt={trip.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900 text-sm line-clamp-2">{trip.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {trip.destination.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date</span>
                    <span>{new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span>{trip.duration.days} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Travelers</span>
                    <span>{travelers}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-semibold">${total}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
