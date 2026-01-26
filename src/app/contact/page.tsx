"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, HelpCircle } from "lucide-react";
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

  const contactInfo = [
    { icon: Phone, title: "Phone", content: "+1 (234) 567-890", subtitle: "Mon-Fri 9am-6pm" },
    { icon: Mail, title: "Email", content: "hello@talkwer.com", subtitle: "We reply within 24h" },
    { icon: MapPin, title: "Office", content: "123 Travel Street", subtitle: "Adventure City" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary to-background border-b border-border py-12">
        <div className="container-main">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Support</span>
          <h1 className="heading-1 mt-2">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Have questions? We&apos;re here to help plan your perfect trip
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-8 border-b border-border">
        <div className="container-main">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactInfo.map((info) => (
              <div key={info.title} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-3 rounded-lg bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{info.content}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-main section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="heading-3">Send a Message</h2>
            </div>

            {submitted ? (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400">
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input
                      className="mt-1.5"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      className="mt-1.5"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    className="mt-1.5"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px]"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="heading-3">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-card border border-border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 p-6 rounded-xl bg-secondary border border-border">
              <h3 className="font-semibold text-foreground">Still have questions?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Our support team is available 24/7 to help you
              </p>
              <a
                href="tel:+1234567890"
                className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Phone className="h-4 w-4" />
                Call us: +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
