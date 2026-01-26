"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-slate-900 py-12">
        <div className="container-travel">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Contact Us</h1>
          <p className="mt-2 text-slate-400">We&apos;re here to help with your travel plans</p>
        </div>
      </div>

      <div className="container-travel section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Send a Message</h2>

            {submitted ? (
              <div className="mt-6 p-4 bg-green-50 rounded-lg text-green-700 text-sm">
                Thank you! We&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Name</label>
                    <Input className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input className="mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <Input className="mt-1" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid sm:grid-cols-3 gap-6">
              <div>
                <Phone className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-medium text-slate-900">Phone</p>
                <p className="text-sm text-slate-500">+1 (234) 567-890</p>
              </div>
              <div>
                <Mail className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-500">hello@talkwer.com</p>
              </div>
              <div>
                <MapPin className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-medium text-slate-900">Office</p>
                <p className="text-sm text-slate-500">123 Travel Street</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">FAQs</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
