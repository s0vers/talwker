"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (234) 567-890",
      subtitle: "Mon-Fri 9am-6pm EST",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@talkwer.com",
      subtitle: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      content: "123 Travel Street",
      subtitle: "Adventure City, AC 12345",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "24/7 Support",
      subtitle: "We're always here to help",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20 pt-32">
        <div className="container-travel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Have questions about a trip? Need help planning your adventure? We&apos;re
              here to help!
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white">{info.title}</h3>
                <p className="mt-1 text-white">{info.content}</p>
                <p className="mt-1 text-sm text-slate-400">{info.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20">
        <div className="container-travel">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Send us a Message
                </h2>
              </div>
              <p className="mt-2 text-slate-600">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <Input
                      className="mt-1"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Phone (Optional)
                    </label>
                    <Input
                      className="mt-1"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Subject
                    </label>
                    <Input
                      className="mt-1"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-xl border border-input p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={5}
                    placeholder="Tell us about your inquiry..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-green-50 p-4 text-center text-green-700"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="mt-2 text-slate-600">
                Find quick answers to common questions about our services.
              </p>

              <Accordion type="single" collapsible className="mt-8">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Our support team is available 24/7 to assist you with any inquiries.
                </p>
                <a
                  href="tel:+1234567890"
                  className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  Call us: +1 (234) 567-890
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-slate-100">
        <div className="h-96 w-full bg-slate-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-slate-500">Interactive Map Placeholder</p>
            <p className="text-sm text-slate-400">123 Travel Street, Adventure City</p>
          </div>
        </div>
      </section>
    </div>
  );
}
