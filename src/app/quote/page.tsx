"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceOptions = [
  "Office Supplies & Stationery",
  "Electrical & Hardware Materials",
  "Agricultural Inputs & Equipment",
  "Construction Materials",
  "Medical & Laboratory Equipment",
  "Household & Industrial Goods",
  "Mining Equipment & Protective Gear",
  "Food & Vegetables",
];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  service: string;
  items: string;
  budget: string;
  deliveryDate: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  service: serviceOptions[0],
  items: "",
  budget: "",
  deliveryDate: "",
};

// ✅ Strong readable styles (IMPORTANT)
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300";
const selectClass =
  "w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300";
const textareaClass =
  "w-full rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 px-4 py-3 text-sm min-h-[140px] outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300";

function Label({
  title,
  required,
  hint,
}: {
  title: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2">
      <label className="text-sm font-medium text-gray-800">
        {title} {required && <span className="text-red-600">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

export default function QuotePage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const isValid = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.items.trim() !== ""
    );
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValid) {
      setStatus("error");
      setMessage("Please fill in Full Name, Phone Number, and Items Needed.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit quote request.");
      }

      setStatus("success");
      setMessage(
        "Request received! We’ll contact you shortly with pricing and delivery options."
      );
      setForm(initialState);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Navbar />

      {/* ✅ Keep white theme and readable text */}
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900">Request a Quote</h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            Tell us what you need and we’ll respond with pricing and delivery
            options.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
            {/* FORM */}
            <form
              onSubmit={onSubmit}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Quote Details
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Fields marked with <span className="text-red-600">*</span>{" "}
                    are required.
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Secure request
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label title="Full Name" required />
                  <input
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label
                    title="Phone Number"
                    required
                    hint="Include country code e.g., +255..."
                  />
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder="+255..."
                  />
                </div>

                <div>
                  <Label
                    title="Email"
                    hint="Optional, for faster follow-up."
                  />
                  <input
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <Label title="Company" hint="Optional." />
                  <input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className={inputClass}
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <Label
                    title="Location"
                    hint="City/Region (e.g., Geita, Dar es Salaam)"
                  />
                  <input
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={inputClass}
                    placeholder="Your location"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label title="Category / Service" />
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={selectClass}
                  >
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Label
                    title="Items Needed"
                    required
                    hint="Include quantity, brand, size, and deadline if possible."
                  />
                  <textarea
                    value={form.items}
                    onChange={(e) => update("items", e.target.value)}
                    className={textareaClass}
                    placeholder="Example: A4 papers (10 boxes), printer toner HP 85A (5 pcs), safety helmets (20 pcs)..."
                  />
                </div>

                <div>
                  <Label title="Budget" hint="Optional (e.g., TZS 500,000)" />
                  <input
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className={inputClass}
                    placeholder="TZS ..."
                  />
                </div>

                <div>
                  <Label title="Preferred Delivery Date" hint="Optional." />
                  <input
                    type="date"
                    value={form.deliveryDate}
                    onChange={(e) => update("deliveryDate", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`mt-6 rounded-2xl px-4 py-3 text-sm border ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  By submitting, you agree we may contact you by phone/email.
                </p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm disabled:opacity-60"
                >
                  {status === "sending" ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>

            {/* SIDE CARD */}
            <aside className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                What happens next?
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="mt-0.5">✅</span>
                  <span>We review your list and confirm availability.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">💬</span>
                  <span>We contact you with pricing and delivery options.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">🚚</span>
                  <span>We deliver safely and on time across Tanzania.</span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-600">
                  Need urgent help? Send your request on WhatsApp for faster
                  response.
                </p>

                <a
                  href="/quote"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
                >
                  Send via WhatsApp →
                </a>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Contact: +255 764 794 625 / +255 762 288 877
                <br />
                Email: budebagen.enterprises@gmail.com
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
