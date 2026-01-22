"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";

type Quote = {
  id: string;
  fullName: string;
  phone: string;
  service: string;
  items: string;
  status: string;
  createdAt: string;
};

// ✅ Helpers (WhatsApp / Phone / Copy)
function normalizePhoneToE164TZ(phone: string) {
  const raw = (phone || "").trim();

  // Already has +
  if (raw.startsWith("+")) return raw.replace(/\s+/g, "");

  // Remove spaces/dashes/anything not digit
  const digits = raw.replace(/[^\d]/g, "");

  // 0xxxxxxxxx -> +255xxxxxxxxx
  if (digits.startsWith("0") && digits.length >= 10) {
    return `+255${digits.slice(1)}`;
  }

  // 255xxxxxxxxx -> +255xxxxxxxxx
  if (digits.startsWith("255")) {
    return `+${digits}`;
  }

  // Fallback: try adding +
  return digits ? `+${digits}` : "";
}

function waLink(phone: string, text: string) {
  const e164 = normalizePhoneToE164TZ(phone);
  const digitsOnly = e164.replace(/[^\d]/g, ""); // wa.me requires digits only
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${digitsOnly}?text=${encoded}`;
}

function telLink(phone: string) {
  const e164 = normalizePhoneToE164TZ(phone);
  return `tel:${e164}`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function StatusPill({ status }: { status: string }) {
  const s = (status || "new").toLowerCase();

  const styles =
    s === "delivered"
      ? "bg-green-50 text-green-700 border-green-200"
      : s === "contacted"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  const label =
    s === "delivered" ? "Delivered" : s === "contacted" ? "Contacted" : "New";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // ✅ Toast + saving row state
  const [toast, setToast] = useState<string>("");
  const [savingId, setSavingId] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quotes;
    return quotes.filter((x) => {
      return (
        x.fullName?.toLowerCase().includes(q) ||
        x.phone?.toLowerCase().includes(q) ||
        x.service?.toLowerCase().includes(q) ||
        x.items?.toLowerCase().includes(q)
      );
    });
  }, [quotes, query]);

  async function updateStatus(id: string, status: string) {
    setSavingId(id);
    setToast("");

    const res = await fetch("/api/quote/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setSavingId("");

    if (!res.ok) {
      setToast("Failed to save. Try again.");
      window.setTimeout(() => setToast(""), 1800);
      return;
    }

    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    setToast("Saved ✅");
    window.setTimeout(() => setToast(""), 1500);
  }

  async function handleCopy(label: string, text: string) {
    const ok = await copyText(text);
    if (!ok) {
      setToast("Copy failed. Please copy manually.");
      window.setTimeout(() => setToast(""), 1800);
      return;
    }
    setToast(`${label} copied ✅`);
    window.setTimeout(() => setToast(""), 1200);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
              {/* top bar */}
              <div className="px-6 py-6 border-b bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Admin Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Manage quote requests and update statuses.
                    </p>

                    {toast && (
                      <div className="mt-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                        {toast}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, phone, service, items..."
                        className="w-full sm:w-[320px] rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ⌕
                      </div>
                    </div>

                    <form action="/api/auth/logout" method="POST">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="px-3 py-1 rounded-full bg-gray-100 border">
                    Total: <b className="text-gray-900">{quotes.length}</b>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                    New:{" "}
                    <b className="text-blue-900">
                      {
                        quotes.filter((q) => (q.status || "new") === "new")
                          .length
                      }
                    </b>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                    Contacted:{" "}
                    <b className="text-amber-900">
                      {quotes.filter((q) => q.status === "contacted").length}
                    </b>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">
                    Delivered:{" "}
                    <b className="text-green-900">
                      {quotes.filter((q) => q.status === "delivered").length}
                    </b>
                  </span>
                </div>
              </div>

              {/* table */}
              <div className="p-6">
                <div className="overflow-x-auto rounded-2xl border">
                  {loading ? (
                    <div className="p-8 text-gray-600">
                      <div className="h-5 w-56 bg-gray-100 rounded mb-3" />
                      <div className="h-4 w-80 bg-gray-100 rounded mb-2" />
                      <div className="h-4 w-72 bg-gray-100 rounded" />
                      <p className="mt-6 text-sm">Loading quotes…</p>
                    </div>
                  ) : (
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="text-left px-4 py-3">Date</th>
                          <th className="text-left px-4 py-3">Customer</th>
                          <th className="text-left px-4 py-3">Service</th>
                          <th className="text-left px-4 py-3">Items</th>
                          <th className="text-left px-4 py-3">Status</th>
                          <th className="text-left px-4 py-3">Update</th>
                          <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filtered.map((q) => {
                          const message = `Hello ${q.fullName},\n\nThank you for requesting a quote from Budeba General Enterprise.\n\nWe received your request for:\n${q.items}\n\nService: ${q.service}\n\nPlease confirm:\n1) Your location for delivery\n2) Quantity/specifications\n3) Preferred delivery date\n\nThank you.`;

                          const whatsappHref = waLink(q.phone, message);

                          return (
                            <tr
                              key={q.id}
                              className="border-t hover:bg-gray-50/60"
                            >
                              <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                                {new Date(q.createdAt).toLocaleString()}
                              </td>

                              <td className="px-4 py-4">
                                <div className="font-medium text-gray-900">
                                  {q.fullName}
                                </div>
                                <div className="text-gray-500 text-xs mt-1">
                                  {q.phone}
                                </div>
                              </td>

                              <td className="px-4 py-4 text-gray-800">
                                {q.service}
                              </td>

                              <td className="px-4 py-4 max-w-[520px]">
                                <div className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                                  {q.items}
                                </div>
                              </td>

                              <td className="px-4 py-4">
                                <StatusPill status={q.status || "new"} />
                              </td>

                              <td className="px-4 py-4">
                                <select
                                  disabled={savingId === q.id}
                                  value={q.status || "new"}
                                  onChange={(e) =>
                                    updateStatus(q.id, e.target.value)
                                  }
                                  className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="delivered">Delivered</option>
                                </select>

                                {savingId === q.id && (
                                  <div className="mt-2 text-xs text-gray-500">
                                    Saving...
                                  </div>
                                )}
                              </td>

                              <td className="px-4 py-4">
                                <div className="flex flex-wrap gap-2">
                                  <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50"
                                  >
                                    WhatsApp →
                                  </a>

                                  <a
                                    href={telLink(q.phone)}
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50"
                                  >
                                    Call
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(
                                        "Phone",
                                        normalizePhoneToE164TZ(q.phone)
                                      )
                                    }
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50"
                                  >
                                    Copy Phone
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleCopy("Items", q.items)}
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50"
                                  >
                                    Copy Items
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {filtered.length === 0 && (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-4 py-10 text-center text-gray-500"
                            >
                              No matching quote requests.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Tip: Use search to find a request quickly by name, phone,
                  service, or item keywords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
